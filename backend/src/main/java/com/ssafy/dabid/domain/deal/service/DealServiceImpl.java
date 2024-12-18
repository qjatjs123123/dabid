package com.ssafy.dabid.domain.deal.service;

import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.auction.entity.AuctionDocument;
import com.ssafy.dabid.domain.auction.repository.AuctionElasticSearchRepository;
import com.ssafy.dabid.domain.auction.repository.AuctionJpaRepository;
import com.ssafy.dabid.domain.auction.repository.AuctionRepository;
import com.ssafy.dabid.domain.auction.service.AuctionService;
import com.ssafy.dabid.domain.auction.service.BiddingSMSService;
import com.ssafy.dabid.domain.deal.dto.request.ChatMessageRequestDto;
import com.ssafy.dabid.domain.deal.dto.request.CourierRequest;
import com.ssafy.dabid.domain.deal.dto.request.CourierRequestNo;
import com.ssafy.dabid.domain.deal.entity.ChatMessage;
import com.ssafy.dabid.domain.deal.repository.ChatMessageRepository;
import com.ssafy.dabid.global.api.ssafy.request.SsafyApiHeaderRequest;
import com.ssafy.dabid.global.api.ssafy.request.SsafyApiRequest;
import com.ssafy.dabid.domain.deal.dto.response.*;
import com.ssafy.dabid.domain.deal.dto.response.BuyerBalanceAndAccount;
import com.ssafy.dabid.domain.deal.dto.response.DealResponseDto;
import com.ssafy.dabid.domain.deal.dto.response.InquireDemandDepositAccountBalance;
import com.ssafy.dabid.domain.deal.entity.CarrierId;
import com.ssafy.dabid.domain.member.entity.Account;
import com.ssafy.dabid.domain.deal.entity.Deal;
import com.ssafy.dabid.domain.deal.entity.Status;
import com.ssafy.dabid.domain.deal.repository.DealRepository;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberAccountRepository;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import com.ssafy.dabid.global.api.ssafy.response.AccountBalanceResponse;
import com.ssafy.dabid.global.api.ssafy.response.CreateAccountResponse;
import com.ssafy.dabid.global.api.ssafy.response.TransferResponse;
import com.ssafy.dabid.global.utils.S3Util;
import com.ssafy.dabid.global.api.ssafy.SsafyApiClient;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

import static com.ssafy.dabid.global.consts.StaticConst.*;
import static com.ssafy.dabid.global.consts.StaticFunc.getSsafyApiHeaderRequest;

@Slf4j
@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {
    private final SsafyApiClient ssafyApiClient;
    private final DealRepository dealRepository;
    private final MemberRepository memberRepository;
    private final AuctionRepository auctionRepository;
    private final AuctionElasticSearchRepository auctionElasticSearchRepository;
    private final MemberAccountRepository memberAccountRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final DeliveryTrackerAPIClient deliveryTrackerAPIClient;
    private final S3Util s3Util;
    // 스케줄러 임의 실행 테스트 start
    private final AuctionJpaRepository auctionJpaRepository;
    private final AuctionService auctionService;
    private final BiddingSMSService biddingSMSService;
    // 스케줄러 임의 실행 테스트 end

    private static final String baseURL = "/edu/demandDeposit/";

    @Override
    public Status findDeliveryStatus(CourierRequest courierRequest, int dealId) {
        String carrierId = String.valueOf(courierRequest.getCarrierId()); // Enum에서 carrierId 값을 가져옵니다.
        String modifiedCarrierId = carrierId.toLowerCase().replace("_", ".");
        CourierRequestNo cn = new CourierRequestNo(modifiedCarrierId, courierRequest.getTrackingNumber());
        log.info(carrierId + " " + modifiedCarrierId);
        String status = deliveryTrackerAPIClient.trackPackage(cn);
        log.info(status);
        Status newStatus = null;

        if (status.isEmpty()) return Status.ERROR;

        if (status.equals(Status.DELIVERED)) newStatus = Status.DELIVERED;
        else newStatus = Status.IN_TRANSIT;

        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new NoSuchElementException("거래를 찾을 수 없습니다."));
        deal.setStatus(newStatus);
        deal.setCarrier_id(courierRequest.getCarrierId());
        deal.setTrackingNumber(courierRequest.getTrackingNumber());
        dealRepository.save(deal);

        return newStatus;
    }

    @Override
    @Transactional
    public void closeDealTransaction(int dealId) {
        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new NoSuchElementException("거래를 찾을 수 없습니다."));
        int buyer_id = deal.getBuyer().getId();
        int seller_id = deal.getSeller().getId();
        int deposit = deal.getDeposit();
        int winning_bid = deal.getWinning_bid();
        String  deal_account = deal.getAccount();

        Member buyer = memberRepository.findById(buyer_id)
                .orElseThrow(() -> new NoSuchElementException("구매자를 찾을 수 없습니다."));
        Member seller = memberRepository.findById(seller_id)
                .orElseThrow(() -> new NoSuchElementException("판매자를 찾을 수 없습니다."));

        // 구매자 낙찰금 보증금 환급
        buyer.increasePoint(deposit);
        memberRepository.save(buyer);
        // 거래 비활성화
        deal.kill();
        // 거래 완료 상태
        deal.setStatus(Status.TRANSACTION_DONE);

        // 가상 계좌에 있는 돈을 판매자 계좌에 입금
        Account seller_account = memberAccountRepository.findByMember(seller);

        TransferResponse transferResponse = ssafyApiClient.deposit(ADMIN_USER_KEY, seller_account.getAccount_number(), deal_account, String.valueOf(winning_bid));

        if (transferResponse.getRec() == null)
            throw new NoSuchElementException("전송 응답에서 REC 값을 찾을 수 없습니다.");
        dealRepository.save(deal);
    }

    @Override
    public InquireDemandDepositAccountBalance findSellerAccount(int dealId) {
        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new NoSuchElementException("거래를 찾을 수 없습니다."));

        String dealAccount = deal.getAccount();

        // 가상계좌 잔액 조회
        AccountBalanceResponse response = ssafyApiClient.accountBalance(ADMIN_USER_KEY, dealAccount);

        InquireDemandDepositAccountBalance accountInfo = new InquireDemandDepositAccountBalance();
        InquireDemandDepositAccountBalance.Rec recInfo = new InquireDemandDepositAccountBalance.Rec();
        recInfo.setAccountNo(response.getRec().getAccountNo());
        recInfo.setAccountBalance(response.getRec().getAccountBalance());
        accountInfo.setRec(recInfo);

        return accountInfo;
    }

    @Override
    public BuyerBalanceAndAccount findBuyerAccount(int dealId) {

        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new NoSuchElementException("거래를 찾을 수 없습니다."));

        int buyer_id = deal.getBuyer().getId();
        String userKey = deal.getBuyer().getUserKey();

        Account buyer_info = memberAccountRepository.findByMemberId(buyer_id);
        String buyer_account = buyer_info.getAccount_number();

        // 구매자 계좌 잔액 조회
        AccountBalanceResponse response = ssafyApiClient.accountBalance(userKey, buyer_account);

        BuyerBalanceAndAccount buyerInfo = BuyerBalanceAndAccount.builder()
                .buyer_balance(response.getRec().getAccountNo())
                .deal_account(deal.getAccount())
                .winning_bid(deal.getWinning_bid())
                .build();

        return buyerInfo;
    }

    // 거래 데이터 생성
    @Override
    public void createDeal(int auctionId) {

        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new RuntimeException("해당 경매가 존재하지 않습니다."));

        // 낙찰자(구매자)
        Member buyer = memberRepository.findById(auction.getFirstMemberId())
                .orElseThrow(() -> new RuntimeException("해당 구매자가 존재하지 않습니다."));

        // 거래용 가상계좌 생성 (관리자 계정)
        CreateAccountResponse response = ssafyApiClient.createAccount(ADMIN_USER_KEY);
        String accountNo = response.getRec().getAccountNo();
        log.info("계좌번호 = {}", accountNo);

        // 거래 데이터 생성
        Deal deal = Deal.builder()
                .seller(auction.getMember())
                .buyer(buyer)
                .title(auction.getTitle())
                .image(s3Util.generateFileUrl(auction.getThumbnail()))
                .winning_bid(auction.getSecondBid())
                .deposit(auction.getDeposit())
                .status(Status.BID_SUCCESS)
                .detail(auction.getDetail())
                .account(accountNo)
                .build();
        dealRepository.save(deal);
    }
    @Override
    public List<ListDealResponseDto> listDealPage(String email, int page, int size) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
        log.info("닉네임 : {}", member.getNickname());
        Page<Deal> dealPage = dealRepository.findAllBySellerOrBuyerOrderByCreatedAtDesc(member, member, PageRequest.of(page, size));

        List<ListDealResponseDto> result = new ArrayList<>();

        for (Deal deal : dealPage) {
            int buyer_id = deal.getBuyer().getId();
            int seller_id = deal.getSeller().getId();

            Member buyer = memberRepository.findById(buyer_id)
                    .orElseThrow(() -> new NoSuchElementException("구매자를 찾을 수 없습니다."));
            Member seller = memberRepository.findById(seller_id)
                    .orElseThrow(() -> new NoSuchElementException("판매자를 찾을 수 없습니다."));

            boolean isSeller = member.getId() == deal.getSeller().getId();
            boolean isTimerVisible = false; // 입금 전 타이머 표시 여부

            ListDealResponseDto dto = ListDealResponseDto.builder()
                    .id(deal.getId())
                    .seller_nickname(deal.getSeller().getNickname())
                    .seller_imageUrl(s3Util.generateFileUrl(seller.getImageUrl()))
                    .buyer_nickname(buyer.getNickname())
                    .buyer_imageUrl(s3Util.generateFileUrl(buyer.getImageUrl()))
                    .title(deal.getTitle())
                    .detail(deal.getDetail())
//                    .image(s3Util.generateFileUrl(deal.getImage()))
                    .image(deal.getImage())
                    .winning_bid(deal.getWinning_bid())
//                    .status(sta)
                    .status(deal.getStatus() != null ? deal.getStatus().name() : String.valueOf(Status.BID_SUCCESS))
                    .isTimerVisible(isTimerVisible)  // 타이머 표시 여부 전달
                    .created_at(deal.getCreatedAt())
                    .build();


            result.add(dto);
        }

        return result;
    }

    @Override
    public long countBySellerOrBuyer(Member seller, Member buyer) {
        return dealRepository.countBySellerOrBuyer(seller, buyer);
    }

    @Override
    public List<ListDealResponseDto> listDeal(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
        log.info("닉네임 : {}", member.getNickname());

        List<Deal> list = dealRepository.findAllBySellerOrBuyer(member, member);

        List<ListDealResponseDto> result = new ArrayList<>();

        for (Deal deal : list) {

            String sta = "";
            boolean isSeller = member.getId() == deal.getSeller().getId();
            boolean isTimerVisible = false; // 입금 전 타이머 표시 여부

            if(deal.getStatus() == Status.TRANSACTION_DONE){
                sta = "거래완료";
            } else{
                if(!isSeller && deal.getStatus() == Status.BID_SUCCESS){
                    sta = "입금전";
                    isTimerVisible = true;
                } else {
                    sta = "거래중";
                }
            }

            ListDealResponseDto dto = ListDealResponseDto.builder()
                    .id(deal.getId())
                    .seller_nickname(deal.getSeller().getNickname())
                    .title(deal.getTitle())
                    .detail(deal.getDetail())
                    .image(s3Util.generateFileUrl(deal.getImage()))
                    .winning_bid(deal.getWinning_bid())
                    .status(sta)
                    .isTimerVisible(isTimerVisible)  // 타이머 표시 여부 전달
                    .created_at(deal.getCreatedAt())
                    .build();

            result.add(dto);
        }

        return result;
    }

    @Override
    public DealResponseDto detailDeal(String email, int id) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
        log.info("닉네임 : {}", member.getNickname());



        Deal deal = dealRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("거래를 찾을 수 없습니다."));
        log.info("호출 전 상태 : {}", deal.getStatus());
        // tracking_number가 null이 아니면
        if(deal.getStatus()!=Status.TRANSACTION_DONE && deal.getTrackingNumber() != null){

            // 택배 현황 조회 API 호출
            CarrierId carrierId = deal.getCarrier_id();
            String trackingNumber = deal.getTrackingNumber();
            CourierRequest request = CourierRequest.builder()
                    .carrierId(carrierId).trackingNumber(trackingNumber).build();

            String carrierId1 = String.valueOf(request.getCarrierId()); // Enum에서 carrierId 값을 가져옵니다.
            String modifiedCarrierId = carrierId1.toLowerCase().replace("_", ".");
            CourierRequestNo cn = new CourierRequestNo(modifiedCarrierId, request.getTrackingNumber());

            String status = deliveryTrackerAPIClient.trackPackage(cn);

            if (!status.equals("DELIVERED")) status = "IN_TRANSIT";

            //  status 갱신
            deal.setStatus(Status.valueOf(status));
            log.info("호출 후 상태 : {}", deal.getStatus());
            dealRepository.save(deal);
        }

        boolean isSeller = member.getId() == deal.getSeller().getId();
        boolean isTimerVisible = false; // 입금 전 타이머 표시 여부

        if(!isSeller && deal.getStatus() == Status.BID_SUCCESS){
            isTimerVisible = true;
        } else{
            isTimerVisible = false;
        }
        int buyer_id = deal.getBuyer().getId();
        int seller_id = deal.getSeller().getId();

        Member buyer = memberRepository.findById(buyer_id)
                .orElseThrow(() -> new NoSuchElementException("구매자를 찾을 수 없습니다."));
        Member seller = memberRepository.findById(seller_id)
                .orElseThrow(() -> new NoSuchElementException("판매자를 찾을 수 없습니다."));
        DealResponseDto dto = DealResponseDto.builder()
                .id(deal.getId())
                .seller_nickname(deal.getSeller().getNickname())
                .seller_imageUrl(s3Util.generateFileUrl(seller.getImageUrl()))
                .buyer_nickname(buyer.getNickname())
                .buyer_imageUrl(s3Util.generateFileUrl(buyer.getImageUrl()))
                .title(deal.getTitle())
                .detail(deal.getDetail())
                .image(deal.getImage())
//                .image(s3Util.generateFileUrl(deal.getImage()))
                .status(deal.getStatus() != null ? deal.getStatus().name() : String.valueOf(Status.BID_SUCCESS))
                .carrierId(deal.getCarrier_id() != null ? deal.getCarrier_id().name() : null)
                .trackingNumber(deal.getTrackingNumber())
                .created_at(deal.getCreatedAt())
                .isSeller(member.getId() == deal.getSeller().getId())
                .winning_bid(deal.getWinning_bid())// Seller 여부 설정
                .account(deal.getAccount())
                .created_at(deal.getCreatedAt())
                .isTimerVisible(isTimerVisible)
                .build();
        System.out.println(dto.toString());
        return dto;
    }

    @Override
    public DealResponseDto transferBalance(String email, int dealId) {

        String path = baseURL + TRANSFER_CODE;

        Member buyer = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
        log.info("닉네임 : {}", buyer.getNickname());

        String userKey = buyer.getUserKey();
        log.info("구매자 유저키 : {}", userKey);

        Account buyer_account = memberAccountRepository.findByMember(buyer);
        log.info("구매자 계좌 : {}", buyer_account.getAccount_number());

        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new NoSuchElementException("거래를 찾을 수 없습니다."));

        TransferResponse response = ssafyApiClient.deposit(userKey, deal.getAccount(), buyer_account.getAccount_number(), String.valueOf(deal.getWinning_bid()));

        if(response.getHeader().getResponseCode().equals("H0000")){
            deal.setStatus(Status.PAYMENT_COMPLETE);
            dealRepository.save(deal);

        } else{
            throw new RuntimeException("계좌 이체에 실패했습니다.");
        }

        DealResponseDto dto = DealResponseDto.builder()
                .id(deal.getId())
                .seller_nickname(deal.getSeller().getNickname())
                .title(deal.getTitle())
                .detail(deal.getDetail())
                .image(s3Util.generateFileUrl(deal.getImage()))
                .status(deal.getStatus() != null ? deal.getStatus().name() : Status.BID_SUCCESS.name())
                .carrierId(deal.getCarrier_id() != null ? deal.getCarrier_id().name() : null)
                .trackingNumber(deal.getTrackingNumber())
                .created_at(deal.getCreatedAt())
                .isSeller(buyer.getId() == deal.getSeller().getId())  // Seller 여부 설정
                .isTimerVisible(false)
                .build();

        return dto;
    }


    // 스케줄러 임의 실행 테스트 start
    public void testMakeDeal(int auctionId) {
        log.info("스케쥴러 테스트 호출 - endAuctionAndMakeDeal 시작");

        // 경매 key를 통해 스케줄링을 실행할 경매를 알아냄
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않는 경매입니다."));

        if(!auctionService.isExistParticipant(auctionId)) { // 경매 참여자가 존재하지 않은 경우
            auctionService.returnSellerPoint(auctionId);
            // 알림 CoolSMS -> 판매자에게 "니 유감. 아무도 입찰안함"

            log.info("경매 참여자가 존재하지 않는 경우의 스케쥴러 동작 완료");
        }
        else { // 경매 참여자가 존재하는 경우
            auctionService.returnBuyerPointWhenExpired(auctionId, auction.getFirstMemberId(), auction.getDeposit());
            auctionService.returnSellerPoint(auctionId);

            if(auction.getFirstMemberId() != -1) {
                // 거래, 채팅 생성, 거래용 가상계좌 생성
                createDeal(auctionId);
                // 알림 CoolSMS -> 최종 낙찰자에게 "니 낙찰 됬음! 거래로 넘어감!"
                //              -> 판매자에게 "니 거래로 넘어감!"
                //biddingSMSService.sendSellerAndBidder(auctionId);
            }
            
            log.info("경매 참여자가 존재하는 경우의 스케쥴러 동작 완료");
        }

        auction.kill();
        auctionJpaRepository.save(auction);
        AuctionDocument auctionDocument = auctionElasticSearchRepository.findById(String.valueOf(auctionId)).orElse(null);
        if(auctionDocument != null) {
            auctionElasticSearchRepository.delete(auctionDocument);
        }

        log.info("스케쥴러 테스트 호출 - endAuctionAndMakeDeal 종료");
    }
    // 스케줄러 임의 실행 테스트 start

    @Override
    public List<ChatMessageResponseDto> getChatMessage(int dealId) {
        List<ChatMessage> list = chatMessageRepository.findByDealIdOrderByCreatedAtAsc(dealId);
        List<ChatMessageResponseDto> result = new ArrayList<>();
        for(ChatMessage chatMessage : list){
            Member member = memberRepository.findByEmail(chatMessage.getEmail())
                    .orElseThrow(() -> new RuntimeException("회원정보 없음: " + chatMessage.getEmail()));

            ChatMessageResponseDto dto = new ChatMessageResponseDto();
            dto.setDealId(chatMessage.getDealId());
            dto.setEmail(chatMessage.getEmail());
            dto.setNickname(member.getNickname());
            dto.setContent(chatMessage.getContent());
            dto.setProfile(s3Util.generateFileUrl(member.getImageUrl()));
            dto.setCreatedAt(chatMessage.getCreatedAt());
            result.add(dto);
        }
        return result;
    }

    @Override
    public ChatMessage saveChatMessage(String email, ChatMessageRequestDto chatMessage) {
        ChatMessage result = ChatMessage.builder()
                .dealId(chatMessage.getDealId())
                .content(chatMessage.getContent())
                .email(email)
                .createdAt(chatMessage.getCreatedAt())
                .build();
        chatMessageRepository.save(result);
        return result;
    }

    @Override
    public ChatMessageResponseDto convertToResponseDto(ChatMessage message) {
        Member member = memberRepository.findByEmail(message.getEmail())
                .orElseThrow(() -> new RuntimeException("회원정보 없음: " + message.getEmail()));

        return ChatMessageResponseDto.builder()
                .dealId(message.getDealId())
                .email(message.getEmail())
                .nickname(member.getNickname())
                .content(message.getContent())
                .profile(s3Util.generateFileUrl(member.getImageUrl())) // 필요시 주석 해제
                .createdAt(message.getCreatedAt())
                .build();
    }
}
