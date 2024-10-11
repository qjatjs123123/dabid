package com.ssafy.dabid.domain.auction.controller;

import com.ssafy.dabid.domain.auction.dto.request.RegistrationAuctionDto;
import com.ssafy.dabid.domain.auction.dto.request.SearchAuctionTitle;
import com.ssafy.dabid.domain.auction.service.AuctionService;
import com.ssafy.dabid.global.utils.S3Util;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.quartz.SchedulerException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auctions")
@RequiredArgsConstructor
public class AuctionController {
    private final AuctionService service;
    private final S3Util s3Util;

    @GetMapping("/mine")
    public ResponseEntity<?> getMyAuction(){
        return new ResponseEntity<>(service.getMyAuctions(), HttpStatus.OK);
    }

    @GetMapping("/joining")
    public ResponseEntity<?> getJoinAuction(){
        return new ResponseEntity<>(service.getJoinAuctions(), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getAuctions() {
        return new ResponseEntity<>(service.getAuctions(), HttpStatus.OK);
    }

    @PostMapping("/title")
    public ResponseEntity<?> getAuctions(@RequestBody SearchAuctionTitle searchAuctionTitle) {
        return new ResponseEntity<>(service.getAuctionsTitle(searchAuctionTitle), HttpStatus.OK);
    }

    @PostMapping("/test/title")
    public ResponseEntity<?> getAuctionsTest(@RequestBody SearchAuctionTitle searchAuctionTitle) {
        return new ResponseEntity<>(service.getAuctionsTitleTest(searchAuctionTitle), HttpStatus.OK);
    }

    @GetMapping("/{auctionId}")
    public ResponseEntity<?> getAuction(HttpServletRequest request, @PathVariable("auctionId") int auctionId) throws SchedulerException {
        return new ResponseEntity<>(service.getAuction(auctionId), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<?> registPost(@ModelAttribute RegistrationAuctionDto dto) throws SchedulerException {
        service.registPost(dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{auctionId}")
    public ResponseEntity<?> inActivatePost(@PathVariable("auctionId") int auctionId) throws SchedulerException {
        service.inActivatePost(auctionId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
