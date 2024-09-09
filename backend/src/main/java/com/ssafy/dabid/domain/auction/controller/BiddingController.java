package com.ssafy.dabid.domain.auction.controller;

import com.ssafy.dabid.domain.auction.service.BiddingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/bidding")
public class BiddingController {

    private final BiddingService biddingService;

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
    public ResponseEntity<Void> bid(@PathVariable int auctionId, @PathVariable int bid) {
        int result = biddingService.bid(auctionId, bid);

        if(result == 0) {
            return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    // 경매 시간 종료
    
}
