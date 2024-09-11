package com.ssafy.dabid.domain.job.component;

import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.auction.repository.AuctionJpaRepository;
import com.ssafy.dabid.domain.auction.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DabidJob implements Job {

    private final AuctionJpaRepository auctionJpaRepository;
    private final AuctionService auctionService;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {

        // Trigger에 의해 동작하는 스케쥴러(JobDetail)을 불러옴
        JobDataMap dataMap = context.getJobDetail().getJobDataMap();
        int auctionId = dataMap.getInt("auction");

        endAuctionAndMakeDeal(auctionId);
        dataMap.remove("auction");
    }

    private void endAuctionAndMakeDeal(int auctionId) {
        // 경매 key를 통해 스케줄링을 실행할 경매를 알아냄
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않는 경매입니다."));

        if(auction.getFirstMemberId() == -1) { // 경매 최종 낙찰자가 존재하지 않은 경우
            auctionService.returnSellerPoint(auctionId);
            // 알림 CoolSMS -> 판매자에게 "니 유감. 아무도 입찰안함"
        }
        else { // 경매 최종 낙찰자가 존재하는 경우
            auctionService.returnBuyerPointWhenExpired(auctionId, auction.getFirstMemberId(), auction.getDeposit());
            // 거래, 채팅 생성, 거래용 가상계좌 생성
            // 알림 CoolSMS -> 최종 낙찰자에게 "니 낙찰 됬음! 거래로 넘어감!"
            //              -> 판매자에게 "니 거래로 넘어감!"
        }

        auction.kill();
        auctionJpaRepository.save(auction);
    }

}
