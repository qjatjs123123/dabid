package com.ssafy.dabid.domain.deal.service;

import com.ssafy.dabid.domain.deal.dto.request.CourierRequest;
import com.ssafy.dabid.domain.deal.dto.response.*;
import com.ssafy.dabid.domain.deal.dto.response.BuyerBalanceAndAccount;
import com.ssafy.dabid.domain.deal.dto.response.DealResponseDto;
import com.ssafy.dabid.domain.deal.dto.response.InquireDemandDepositAccountBalance;
import com.ssafy.dabid.domain.deal.entity.Status;

import java.util.List;

public interface DealService {
    Status findDeliveryStatus(CourierRequest courierRequest, int dealId);
    void closeDealTransaction(int dealId);
    InquireDemandDepositAccountBalance findSellerAccount(int dealId, int userKey);
    public void createDeal(int auctionId);
//    public CreateDemandDepositAccount createAccount(String userKey);
    public List<ListDealResponseDto> listDeal(String email);
    BuyerBalanceAndAccount findBuyerAccount(int dealId, int userKey);
    public DealResponseDto detailDeal(String email, int id);
    DealResponseDto transferBalance(String email, int dealId);

    // 스케줄러 임의 실행 테스트 start
    public void testMakeDeal(int auctionId);
    // 스케줄러 임의 실행 테스트 end
}

