package com.ssafy.dabid.domain.auction.service;

import org.apache.coyote.BadRequestException;

public interface BiddingService {

    // 경매 참여
    void joinBidding(int auctionId);

    // 경매 참여 포기
    void giveUpBidding(int auctionId);

    // 입찰하기
    void bid(int auctionId, int bid);
}
