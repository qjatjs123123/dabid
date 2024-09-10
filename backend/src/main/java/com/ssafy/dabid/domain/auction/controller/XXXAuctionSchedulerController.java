package com.ssafy.dabid.domain.auction.controller;

import com.ssafy.dabid.domain.auction.dto.request.RegistrationAuctionDto;
import com.ssafy.dabid.domain.job.service.QuartzSchedulerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/* 해당 컨트롤러는 경매 물품 등록 시 요청에만 사용되는 메서드만 존재하므로 나중에 통합 필요 */
@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class XXXAuctionSchedulerController {
    
    private final QuartzSchedulerService schedulerService;

    @PostMapping("/schedule-setting") /* 경매 물품 등록, 경매 종료 시 호출되므로 나중에 통합 필요 */
    public void endAuctionAndMakeDeal(RegistrationAuctionDto dto) {
        /* 경매 등록 절차 코드 */
        /* save한 entity명이 auction이라 가정 */

        // QuartzSchedulerService에서 경매 종료일자에 작업하도록 스케줄링
        // schedulerService.endAuctionAndMakeDeal(auction.getId(), auction.getCreatedAt, auction.getFinishedAt());

        // 경매 물품 중도 삭제 시, schedulerService.deleteAuctionJob(auctionId) 호출
    }
}
