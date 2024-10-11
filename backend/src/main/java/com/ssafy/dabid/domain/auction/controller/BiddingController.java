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
@RequestMapping("/api/biddings")
public class BiddingController {

    private final BiddingService biddingService;

    // 경매 참여
    @PostMapping("/{auctionId}")
    public void joinBidding(@PathVariable int auctionId) {
        biddingService.joinBidding(auctionId);
    }

    // 경매 참여 포기
    @DeleteMapping("/{auctionId}")
    public void giveUpBidding(@PathVariable int auctionId) {
        biddingService.giveUpBidding(auctionId);
    }

    // 입찰하기
    @PatchMapping("/{auctionId}/{bid}")
    public ResponseEntity<?> bid(@PathVariable int auctionId, @PathVariable int bid) {
        int result = biddingService.bid(auctionId, bid);

        if(result == 0) {
            return new ResponseEntity<>(HttpStatus.ACCEPTED); // 낙찰 유력자 탈환 실패
        }
        return new ResponseEntity<>(HttpStatus.OK); // 낙찰 유력자 탈환 성공
    }
}
