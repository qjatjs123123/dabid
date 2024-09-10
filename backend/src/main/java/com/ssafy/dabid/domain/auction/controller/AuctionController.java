package com.ssafy.dabid.domain.auction.controller;

import com.ssafy.dabid.domain.auction.dto.request.RegistrationAuctionDto;
import com.ssafy.dabid.domain.auction.dto.request.TestImageDto;
import com.ssafy.dabid.domain.auction.service.AuctionService;
import com.ssafy.dabid.global.utils.S3Util;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.quartz.SchedulerException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auctions")
@RequiredArgsConstructor
public class AuctionController {
    private final AuctionService service;
    private final S3Util s3Util;

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
    public ResponseEntity<?> registPost(@RequestBody RegistrationAuctionDto dto) throws SchedulerException {
        //        int memberId = Integer.parseInt((String) request.getAttribute("memberId"));
        int memberId = 1;
        service.registPost(dto, memberId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{auctionId}")
    public ResponseEntity<?> inActivatePost(@PathVariable("auctionId") int auctionId) throws SchedulerException {
        service.inActivatePost(auctionId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/test-image")
    public void testImage(@ModelAttribute TestImageDto testImageDto) {
        List<String> imageList = s3Util.uploadFiles(testImageDto.getImages());
        for(String image : imageList){
            System.out.println(image);
        }
    }

}
