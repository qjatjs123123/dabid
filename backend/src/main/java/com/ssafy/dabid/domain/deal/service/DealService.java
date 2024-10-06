package com.ssafy.dabid.domain.deal.service;

import com.ssafy.dabid.domain.deal.dto.request.ChatMessageRequestDto;
import com.ssafy.dabid.domain.deal.dto.request.CourierRequest;
import com.ssafy.dabid.domain.deal.dto.response.*;
import com.ssafy.dabid.domain.deal.dto.response.BuyerBalanceAndAccount;
import com.ssafy.dabid.domain.deal.dto.response.DealResponseDto;
import com.ssafy.dabid.domain.deal.dto.response.InquireDemandDepositAccountBalance;
import com.ssafy.dabid.domain.deal.entity.ChatMessage;
import com.ssafy.dabid.domain.deal.entity.Status;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.global.api.ssafy.response.AccountBalanceResponse;

import java.util.List;

public interface DealService {
    Status findDeliveryStatus(CourierRequest courierRequest, int dealId);
    void closeDealTransaction(int dealId);
    InquireDemandDepositAccountBalance findSellerAccount(int dealId);
    public void createDeal(int auctionId);
//    public CreateDemandDepositAccount createAccount(String userKey);

    public List<ListDealResponseDto> listDeal(String email);
    BuyerBalanceAndAccount findBuyerAccount(int dealId);
    public DealResponseDto detailDeal(String email, int id);
    DealResponseDto transferBalance(String email, int dealId);

    List<ListDealResponseDto> listDealPage(String email, int page, int size);
    long countBySellerOrBuyer(Member seller, Member buyer);

    // 스케줄러 임의 실행 테스트 start
    public void testMakeDeal(int auctionId);
    // 스케줄러 임의 실행 테스트 end

    List<ChatMessageResponseDto> getChatMessage(int dealId);

    ChatMessage saveChatMessage(String email, ChatMessageRequestDto chatMessage);

    ChatMessageResponseDto convertToResponseDto(ChatMessage message);

}

