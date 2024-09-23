package com.ssafy.dabid.domain.deal.service;

import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.auction.repository.AuctionRepository;
import com.ssafy.dabid.domain.deal.dto.request.CourierRequest;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiHeaderRequest;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiRequest;
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
import com.ssafy.dabid.global.utils.S3Util;
import com.ssafy.dabid.global.api.ssafy.SsafyApiClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

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


    @Override
    public Status findDeliveryStatus(CourierRequest courierRequest, int dealId) {
        String status = deliveryTrackerAPIClient.trackPackage(courierRequest);
        Status newStatus = null;

        if (status.isEmpty()) return Status.ERROR;

        if (status.equals(Status.DELIVERED)) newStatus = Status.DELIVERED;
        else newStatus = Status.IN_TRANSIT;

        Deal deal = dealRepository.findById(dealId);
        deal.setStatus(newStatus);
        deal.setCarrier_id(courierRequest.getCarrierId());
        deal.setTrackingNumber(courierRequest.getTrackingNumber());
        dealRepository.save(deal);

        return newStatus;
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

    // 거래 데이터 생성
    @Override
    public void createDeal(int auctionId) {

        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new RuntimeException("해당 경매가 존재하지 않습니다."));

        // 낙찰자(구매자)
        Member buyer = memberRepository.findById(auction.getFirstMemberId())
                .orElseThrow(() -> new RuntimeException("해당 구매자가 존재하지 않습니다."));

        // 거래용 가상계좌 생성 (관리자 계정)
        CreateDemandDepositAccount response = createAccount(ADMIN_USER_KEY);
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

    // 계좌 생성
    @Override
    public CreateDemandDepositAccount createAccount(String userKey) {

        SsafyApiHeaderRequest ssafyApiHeaderRequest = getSsafyApiHeaderRequest(
                CREATE_DEMAND_DEPOSIT_ACCOUNT_CODE,
                CREATE_DEMAND_DEPOSIT_ACCOUNT_CODE,
                userKey
        );

        SsafyApiRequest ssafyApiRequest = SsafyApiRequest.builder()
                .header(ssafyApiHeaderRequest)
                .accountTypeUniqueNo(ACCOUNTTYPUNIQUENO)
                .build();

        CreateDemandDepositAccount response = ssafyApiClient.getSsafyApiResponse(
                CREATE_DEMAND_DEPOSIT_ACCOUNT_CODE,
                ssafyApiRequest,
                CreateDemandDepositAccount.class
        );

        return response;
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

        Deal deal = dealRepository.findById(id);

        // tracking_number가 null이 아니면
        if(deal.getTrackingNumber() != null){
            // 택배 현황 조회 API 호출
            //  status 갱신
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

        Member buyer = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
        log.info("닉네임 : {}", buyer.getNickname());

        String userKey = buyer.getUserKey();
        log.info("구매자 유저키 : {}", userKey);

        Account buyer_account = memberAccountRepository.findByMember(buyer);
        log.info("구매자 계좌 : {}", buyer_account.getAccount_number());

        Deal deal = dealRepository.findById(dealId);

        SsafyApiHeaderRequest ssafyApiHeaderRequest = getSsafyApiHeaderRequest(
                TRANSFER_CODE,
                TRANSFER_CODE,
                userKey
        );

        SsafyApiRequest ssafyApiRequest = SsafyApiRequest.builder()
                .header(ssafyApiHeaderRequest)
                .depositAccountNo(deal.getAccount())
                .transactionBalance(deal.getWinning_bid())
                .withdrawalAccountNo(buyer_account.getAccount_number())
                .build();

        try {
            UpdateDemandDepositAccountTransfer response = ssafyApiClient.getSsafyApiResponse(
                    TRANSFER_CODE,
                    ssafyApiRequest,
                    UpdateDemandDepositAccountTransfer.class
            );

            deal.setStatus(Status.PAYMENT_COMPLETE);

        } catch (RuntimeException e) {
            log.error("이체 중 오류 발생: {}", e.getMessage());
            throw e;
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

}
