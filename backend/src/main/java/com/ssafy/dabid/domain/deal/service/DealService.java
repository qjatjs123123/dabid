package com.ssafy.dabid.domain.deal.service;

import com.ssafy.dabid.domain.deal.dto.response.BuyerBalanceAndAccount;
import com.ssafy.dabid.domain.deal.dto.response.DealResponseDto;
import com.ssafy.dabid.domain.deal.dto.response.InquireDemandDepositAccountBalance;

import java.util.List;

public interface DealService {
    InquireDemandDepositAccountBalance findSellerAccount(int dealId, int userKey);

    BuyerBalanceAndAccount findBuyerAccount(int dealId, int userKey);

    public void createDeal(int auctionId, String email);

    public List<DealResponseDto> listDeal(String email);

    public DealResponseDto detailDeal(String email, int id);
}

