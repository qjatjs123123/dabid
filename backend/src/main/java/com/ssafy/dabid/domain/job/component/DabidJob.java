package com.ssafy.dabid.domain.job.component;

import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.auction.repository.AuctionJpaRepository;
import com.ssafy.dabid.domain.auction.service.AuctionService;
import com.ssafy.dabid.domain.deal.service.DealService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DabidJob implements Job {

    private final AuctionJpaRepository auctionJpaRepository;
    private final AuctionService auctionService;
    private final DealService dealService;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {

        // Trigger에 의해 동작하는 스케쥴러(JobDetail)을 불러옴
        JobDataMap dataMap = context.getJobDetail().getJobDataMap();
        int auctionId = dataMap.getInt("auction");

        endAuctionAndMakeDeal(auctionId);
        dataMap.remove("auction");
    }

    private void endAuctionAndMakeDeal(int auctionId) {
        log.info("스케쥴러 호출 - endAuctionAndMakeDeal 시작");

        // 경매 key를 통해 스케줄링을 실행할 경매를 알아냄
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않는 경매입니다."));

        if(auction.getFirstMemberId() == -1) { // 경매 참여자가 존재하지 않은 경우
            auctionService.returnSellerPoint(auctionId);
            // 알림 CoolSMS -> 판매자에게 "니 유감. 아무도 입찰안함"

            log.info("경매 참여자가 존재하지 않는 경우의 스케쥴러 동작 완료");
        }
        else { // 경매 참여자가 존재하는 경우
            auctionService.returnBuyerPointWhenExpired(auctionId, auction.getFirstMemberId(), auction.getDeposit());
            // 거래, 채팅 생성, 거래용 가상계좌 생성
            dealService.createDeal(auctionId);
            // 알림 CoolSMS -> 최종 낙찰자에게 "니 낙찰 됬음! 거래로 넘어감!"
            //              -> 판매자에게 "니 거래로 넘어감!"
            log.info("경매 참여자가 존재하는 경우의 스케쥴러 동작 완료");
        }

        auction.kill();
        auctionJpaRepository.save(auction);

        log.info("스케쥴러 호출 - endAuctionAndMakeDeal 종료");
    }
}
