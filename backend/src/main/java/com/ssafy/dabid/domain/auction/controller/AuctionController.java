package com.ssafy.dabid.domain.auction.controller;

import com.ssafy.dabid.domain.auction.dto.request.RegistrationAuctionDto;
import com.ssafy.dabid.domain.auction.service.AuctionService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auctions")
@RequiredArgsConstructor
public class AuctionController {
    private final AuctionService service;

    @GetMapping("/")
    public ResponseEntity<?> getAuctions(){
        return new ResponseEntity<>(service.getAuctions(), HttpStatus.OK);
    }

    @GetMapping("/{auctionId}")
    public ResponseEntity<?> getAuction(HttpServletRequest request, @PathVariable("auctionId") int auctionId){
//        int memberId = Integer.parseInt((String) request.getAttribute("memberId"));
        int memberId = 1;
        return new ResponseEntity<>(service.getAuction(auctionId, memberId), HttpStatus.OK);
    }

    @PostMapping("/")
    public ResponseEntity<?> registPost(@RequestBody RegistrationAuctionDto dto){
        //        int memberId = Integer.parseInt((String) request.getAttribute("memberId"));
        int memberId = 1;
        service.registPost(dto, memberId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{auctionId}")
    public ResponseEntity<?> inActivatePost(@PathVariable("auctionId") int auctionId){
        service.inActivatePost(auctionId);

        return new ResponseEntity<>(HttpStatus.OK);
    }


}
