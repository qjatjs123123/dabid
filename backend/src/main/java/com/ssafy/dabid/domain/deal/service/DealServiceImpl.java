package com.ssafy.dabid.domain.deal.service;

import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.auction.repository.AuctionJpaRepository;
import com.ssafy.dabid.domain.auction.repository.AuctionRepository;
import com.ssafy.dabid.domain.auction.service.AuctionService;
import com.ssafy.dabid.domain.deal.dto.request.CourierRequest;
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
import com.ssafy.dabid.global.api.ssafy.response.CreateAccountResponse;
import com.ssafy.dabid.global.api.ssafy.response.TransferResponse;
import com.ssafy.dabid.global.api.ssafy.request.TransferRequest;
import com.ssafy.dabid.global.api.ssafy.response.TransferResponse;
import com.ssafy.dabid.global.utils.S3Util;
import com.ssafy.dabid.global.api.ssafy.SsafyApiClient;
import jakarta.transaction.Transactional;
import jakarta.transaction.TransactionalException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.ssafy.dabid.global.api.ssafy.SsafyApiClient;


import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

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
    private final MemberAccountRepository memberAccountRepository;
    private final DeliveryTrackerAPIClient deliveryTrackerAPIClient;
    private final S3Util s3Util;

    // 스케줄러 임의 실행 테스트 start
    private final AuctionJpaRepository auctionJpaRepository;
    private final AuctionService auctionService;
    // 스케줄러 임의 실행 테스트 end

    private static final String baseURL = "/edu/demandDeposit/";

    @Override
    public Status findDeliveryStatus(CourierRequest courierRequest, int dealId) {
        String status = deliveryTrackerAPIClient.trackPackage(courierRequest);
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

    }

    @Override
    public InquireDemandDepositAccountBalance findSellerAccount(int dealId, int userKey) {
        SsafyApiHeaderRequest ssafyApiHeaderRequest = getSsafyApiHeaderRequest(
                ACCOUNT_BALANCE_CODE,
                ACCOUNT_BALANCE_CODE,
                "937d7d39-eccc-4741-bf54-af154e279537" //임시 나중에 Security에서 멤버에서 가져올것
        );

        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new NoSuchElementException("거래를 찾을 수 없습니다."));

        String dealAccount = deal.getAccount();

        SsafyApiRequest ssafyApiRequest = SsafyApiRequest.builder()
                .header(ssafyApiHeaderRequest)
                .accountNo(dealAccount)
                .build();

        InquireDemandDepositAccountBalance response = ssafyApiClient.getSsafyApiResponse(
                ACCOUNT_BALANCE_CODE,
                ssafyApiRequest,
                InquireDemandDepositAccountBalance.class
        );

        return response;
    }

    @Override
    public BuyerBalanceAndAccount findBuyerAccount(int dealId, int userKey) {
        SsafyApiHeaderRequest ssafyApiHeaderRequest = getSsafyApiHeaderRequest(
                ACCOUNT_BALANCE_CODE,
                ACCOUNT_BALANCE_CODE,
                "71b2ece2-981e-452a-8412-7c6aecbaa2e1" //임시 나중에 Security에서 멤버에서 가져올것
        );

        Deal deal = dealRepository.findById(dealId)
                .orElseThrow(() -> new NoSuchElementException("거래를 찾을 수 없습니다."));

        int buyer_id = deal.getBuyer().getId();

        Account buyer_info = memberAccountRepository.findByMemberId(buyer_id);
        String buyer_account = buyer_info.getAccount_number();


        SsafyApiRequest ssafyApiRequest = SsafyApiRequest.builder()
                .header(ssafyApiHeaderRequest)
                .accountNo(buyer_account)
                .build();

        InquireDemandDepositAccountBalance response = ssafyApiClient.getSsafyApiResponse(
                ACCOUNT_BALANCE_CODE,
                ssafyApiRequest,
                InquireDemandDepositAccountBalance.class
        );

        BuyerBalanceAndAccount buyerInfo = BuyerBalanceAndAccount.builder()
                .buyer_balance(response.getRec().getAccountBalance())
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
        if(deal.getTrackingNumber() != null){

            // 택배 현황 조회 API 호출
            CarrierId carrierId = deal.getCarrier_id();
            String trackingNumber = deal.getTrackingNumber();
            CourierRequest request = CourierRequest.builder()
                    .carrierId(carrierId).trackingNumber(trackingNumber).build();
            String status = deliveryTrackerAPIClient.trackPackage(request);
            log.info("호출 후 상태 : {}", status);

            //  status 갱신
            deal.setStatus(Status.valueOf(status));
            log.info("호출 후 상태 : {}", deal.getStatus());
            dealRepository.save(deal);
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
                .isSeller(member.getId() == deal.getSeller().getId())  // Seller 여부 설정
                .build();

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
                .build();

        return dto;
    }

    // 스케줄러 임의 실행 테스트 start
    public void testMakeDeal(int auctionId) {
        log.info("스케쥴러 테스트 호출 - endAuctionAndMakeDeal 시작");

        // 경매 key를 통해 스케줄링을 실행할 경매를 알아냄
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않는 경매입니다."));

        if(auction.getFirstMemberId() == -1) { // 경매 참여자가 존재하지 않은 경우
            auctionService.returnSellerPoint(auctionId);
            // 알림 CoolSMS -> 판매자에게 "니 유감. 아무도 입찰안함"

            log.info("경매 참여자가 존재하지 않는 경우의 스케쥴러 동작 완료");
        }
        else { // 경매 참여자가 존재하는 경우
            auctionService.returnBuyerPointWhenExpired(auctionId, auction.getFirstMemberId(), auction.getDeposit());
            // 거래, 채팅 생성, 거래용 가상계좌 생성
            createDeal(auctionId);
            // 알림 CoolSMS -> 최종 낙찰자에게 "니 낙찰 됬음! 거래로 넘어감!"
            //              -> 판매자에게 "니 거래로 넘어감!"
            log.info("경매 참여자가 존재하는 경우의 스케쥴러 동작 완료");
        }

        auction.kill();
        auctionJpaRepository.save(auction);

        log.info("스케쥴러 테스트 호출 - endAuctionAndMakeDeal 종료");
    }
    // 스케줄러 임의 실행 테스트 start
}
