package com.ssafy.dabid.domain.auction.controller;

import com.ssafy.dabid.domain.auction.service.BiddingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/bidding")
public class BiddingController {

    private final BiddingService biddingService;

    // 경매 참여, 경매 참여 포기, 입찰하기, 낙찰처리
    //	웹소켓, 배치

    // 경매 참여
    @GetMapping("/join/{auctionId}")
    public void joinBidding(@PathVariable int auctionId) {
        biddingService.joinBidding(auctionId);
    }

    // 경매 참여 포기
    @DeleteMapping("/give-up/{auctionId}")
    public void giveUpBidding(@PathVariable int auctionId) {
        biddingService.giveUpBidding(auctionId);
    }

    // 입찰하기
    @PatchMapping("/{auctionId}/{bid}")
    public void bid(@PathVariable int auctionId, @PathVariable int bid) {
        biddingService.bid(auctionId, bid);
    }

}
