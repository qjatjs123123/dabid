package com.ssafy.dabid.domain.deal.service;

import com.ssafy.dabid.domain.deal.dto.response.DealResponseDto;

import java.util.List;

public interface DealService {
    public void createDeal(int auctionId, String email);

    public List<DealResponseDto> listDeal(String email);

    public DealResponseDto detailDeal(String email, int id);
}
