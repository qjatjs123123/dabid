package com.ssafy.dabid.domain.deal.service;

import com.ssafy.dabid.domain.auction.repository.AuctionImageRepository;
import com.ssafy.dabid.domain.auction.repository.AuctionRepository;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiHeaderRequest;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiRequest;
import com.ssafy.dabid.domain.deal.dto.response.BuyerBalanceAndAccount;
import com.ssafy.dabid.domain.deal.dto.response.DealResponseDto;
import com.ssafy.dabid.domain.deal.dto.response.InquireDemandDepositAccountBalance;
import com.ssafy.dabid.domain.member.entity.Account;
import com.ssafy.dabid.domain.deal.entity.Deal;
import com.ssafy.dabid.domain.deal.entity.Status;
import com.ssafy.dabid.domain.deal.repository.DealRepository;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberAccountRepository;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

import static com.ssafy.dabid.global.consts.StaticConst.SELELCT_ACCOUNT_BALANCE_CODE;
import static com.ssafy.dabid.global.consts.StaticFunc.getSsafyApiHeaderRequest;

@Slf4j
@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {
    private final SsafyApiClient ssafyApiClient;
    private final DealRepository dealRepository;
    private final WebClient webClient;
    private final MemberRepository memberRepository;
    private final AuctionRepository auctionRepository;
    private final AuctionImageRepository auctionImageRepository;
    private final MemberAccountRepository memberAccountRepository;

    @Override
    public String findDeliveryStatus(String carrierId, String trackingNumber) {
        return "";
    }

    @Override
    public InquireDemandDepositAccountBalance findSellerAccount(int dealId, int userKey) {
        SsafyApiHeaderRequest ssafyApiHeaderRequest = getSsafyApiHeaderRequest(
                SELELCT_ACCOUNT_BALANCE_CODE,
                SELELCT_ACCOUNT_BALANCE_CODE,
                "937d7d39-eccc-4741-bf54-af154e279537" //임시 나중에 Security에서 멤버에서 가져올것
        );

        Deal deal = dealRepository.findById(dealId);

        String dealAccount = deal.getAccount();

        SsafyApiRequest ssafyApiRequest = SsafyApiRequest.builder()
                .header(ssafyApiHeaderRequest)
                .accountNo(dealAccount)
                .build();

        InquireDemandDepositAccountBalance response = ssafyApiClient.getSsafyApiResponse(
                SELELCT_ACCOUNT_BALANCE_CODE,
                ssafyApiRequest,
                InquireDemandDepositAccountBalance.class
        );

        return response;
    }

    @Override
    public BuyerBalanceAndAccount findBuyerAccount(int dealId, int userKey) {
        SsafyApiHeaderRequest ssafyApiHeaderRequest = getSsafyApiHeaderRequest(
                SELELCT_ACCOUNT_BALANCE_CODE,
                SELELCT_ACCOUNT_BALANCE_CODE,
                "71b2ece2-981e-452a-8412-7c6aecbaa2e1" //임시 나중에 Security에서 멤버에서 가져올것
        );

        Deal deal = dealRepository.findById(dealId);

        int buyer_id = deal.getBuyer().getId();

        Account buyer_info = memberAccountRepository.findByMemberId(buyer_id);
        String buyer_account = buyer_info.getAccount_number();


        SsafyApiRequest ssafyApiRequest = SsafyApiRequest.builder()
                .header(ssafyApiHeaderRequest)
                .accountNo(buyer_account)
                .build();

        InquireDemandDepositAccountBalance response = ssafyApiClient.getSsafyApiResponse(
                SELELCT_ACCOUNT_BALANCE_CODE,
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

    @Override
    public void createDeal(int auctionId, String email) {

        // 계좌 생성 SSAFY API 호출
//        Member member = memberRepository.findByEmail(email)
//                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
//        String userKey = member.getUser_key();
//        log.info("userKey = {}", userKey);
//
//        LocalDateTime now = LocalDateTime.now();
//        String transmissionDate = now.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
//        String transmissionTime = now.format(DateTimeFormatter.ofPattern("HHmmss"));
//        String uniqueId = generateUniqueTransactionId(transmissionDate, transmissionTime);
//        log.info("Date = {}", transmissionDate);
//        log.info("Time = {}", transmissionTime);
//        log.info("uniqueId = {}", uniqueId);
//
//        CreateDepositAccountRequestDto.HeaderDto headerDto = CreateDepositAccountRequestDto.HeaderDto.builder()
//                .apiName("createDemandDepositAccount")
//                .transmissionDate(transmissionDate)
//                .transmissionTime(transmissionTime)
//                .institutionCode("00100")
//                .fintechAppNo("001")
//                .apiServiceCode("createDemandDepositAccount")
//                .institutionTransactionUniqueNo(uniqueId)
//                .apiKey("931bc6f77a3f40b4bae76c32f9270080")
//                .userKey(userKey)
//                .build();
//
//        CreateDepositAccountRequestDto requestDto = CreateDepositAccountRequestDto.builder()
//                .header(headerDto)
//                .accountTypeUniqueNo("001-1-70ebcf49336a47")
//                .build();
//
//        try {
//            // 외부 API 호출
//            CreateDepositAccountResponseDto response = createDepositAccount(requestDto);
//            log.info("API 호출 성공");
//
//            Auction auction = auctionRepository.findById(auctionId)
//                    .orElseThrow(() -> new RuntimeException("해당 경매가 존재하지 않습니다."));
//
//            Member buyer = memberRepository.findById(auction.getFirstMemberId())
//                    .orElseThrow(() -> new RuntimeException("해당 구매자가 존재하지 않습니다."));
//
//            Auction_Image image = auctionImageRepository.findFirstByAuctionOrderByIdAsc(auction);
//            if (image == null) {
//                throw new RuntimeException("해당 경매에 이미지가 존재하지 않습니다.");
//            }
//
//            // 거래 데이터 생성
//            Deal deal = Deal.builder()
//                    .seller(auction.getMember())
//                    .buyer(buyer)
//                    .title(auction.getTitle())
//                    .image(image.getImage())
//                    .winning_bid(auction.getSecondBid())
//                    .deposit(auction.getDeposit())
//                    .status(Status.BID_SUCCESS)
//                    .detail(auction.getDetail())
//                    .account(response.getRec().getAccountNo())
//                    .build();
//            dealRepository.save(deal);
//
//        } catch (Exception e) {
//            log.error("API 호출 실패", e);
//            throw new RuntimeException("거래 계좌 생성 중 오류 발생", e);
//        }
    }

    @Override
    public List<DealResponseDto> listDeal(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
        log.info("닉네임 : {}", member.getNickname());

        List<Deal> list = dealRepository.findAllBySellerOrBuyer(member, member);

        List<DealResponseDto> result = new ArrayList<>();

        for (Deal deal : list) {

            String sta = "";
            if(deal.getStatus() == Status.TRANSACTION_DONE){
                sta = "거래완료";
            } else{
                sta = "거래중";
            }

            DealResponseDto dto = DealResponseDto.builder()
                    .id(deal.getId())
                    .seller_nickname(deal.getSeller().getNickname())
                    .buyer_nickname(deal.getBuyer().getNickname())
                    .title(deal.getTitle())
                    .detail(deal.getDetail())
                    .image(deal.getImage())
                    .winning_bid(deal.getWinning_bid())
                    .status(sta)
                    .carrierId(deal.getCarrier_id() != null ? deal.getCarrier_id().name() : null)
                    .trackingNumber(deal.getTrackingNumber())
                    .created_at(deal.getCreatedAt())
                    .isSeller(member.getId() == deal.getSeller().getId())  // Seller 여부 설정
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

        Deal deal = dealRepository.findById(id);

        // tracking_number가 null이 아니면
        if(deal.getTrackingNumber() != null){
            // 택배 현황 조회 API 호출
            //  status 갱신
        }

        DealResponseDto dto = DealResponseDto.builder()
                .id(deal.getId())
                .seller_nickname(deal.getSeller().getNickname())
                .buyer_nickname(deal.getBuyer().getNickname())
                .title(deal.getTitle())
                .detail(deal.getDetail())
                .image(deal.getImage())
                .winning_bid(deal.getWinning_bid())
                .status(deal.getStatus() != null ? deal.getStatus().name() : Status.BID_SUCCESS.name())
                .carrierId(deal.getCarrier_id() != null ? deal.getCarrier_id().name() : null)
                .trackingNumber(deal.getTrackingNumber())
                .created_at(deal.getCreatedAt())
                .isSeller(member.getId() == deal.getSeller().getId())  // Seller 여부 설정
                .build();

        return dto;
    }

//    public CreateDepositAccountResponseDto createDepositAccount(CreateDepositAccountRequestDto requestDto){
//        return webClient.post()
//                .uri("/edu/demandDeposit/createDemandDepositAccount")
//                .bodyValue(requestDto)
//                .retrieve()
//                .onStatus(HttpStatusCode::is4xxClientError, clientResponse -> {
//                    log.error("클라이언트 오류: " + clientResponse.statusCode());
//                    return clientResponse.bodyToMono(String.class)
//                            .flatMap(errorBody -> Mono.error(new RuntimeException("클라이언트 오류: " + errorBody)));
//                })
//                .onStatus(HttpStatusCode::is5xxServerError, clientResponse -> {
//                    log.error("서버 오류: " + clientResponse.statusCode());
//                    return clientResponse.bodyToMono(String.class)
//                            .flatMap(errorBody -> Mono.error(new RuntimeException("서버 오류: " + errorBody)));
//                })
//                .bodyToMono(CreateDepositAccountResponseDto.class)
//                .block();
//
//    }

//    private String generateUniqueTransactionId(String date, String time) {
//        Random random = new Random();
//        int randomNum = 100000 + random.nextInt(900000);
//        return date + time + randomNum;
//    }
}
