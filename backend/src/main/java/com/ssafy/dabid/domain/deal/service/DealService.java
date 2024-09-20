package com.ssafy.dabid.domain.deal.service;

import com.ssafy.dabid.domain.deal.dto.response.*;

import java.util.List;

public interface DealService {
    InquireDemandDepositAccountBalance findSellerAccount(int dealId, int userKey);
    public void createDeal(int auctionId);
    public CreateDemandDepositAccount createAccount(String userKey);
    public List<ListDealResponseDto> listDeal(String email);

    public DealResponseDto detailDeal(String email, int id);

    DealResponseDto transferBalance(String email, int dealId);
}

