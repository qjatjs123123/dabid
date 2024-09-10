package com.ssafy.dabid.domain.job.component;

import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DavidJob implements Job {

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {

        // Trigger에 의해 동작하는 스케쥴러(JobDetail)을 불러옴
        JobDataMap dataMap = context.getJobDetail().getJobDataMap();
        int auctionId = dataMap.getInt("auction");

        endAuctionAndMakeDeal(auctionId);
        dataMap.remove("auction");
    }

    private void endAuctionAndMakeDeal(int auctionId) {
        // 1. 경매 key를 통해 스케줄링을 실행할 경매를 알아냄
        // 1'. 경매 중도 삭제 시, 해당 스케줄링을 삭제하는지 고려해야함 -> 현 함수는 중도가 아닌 만기일때만 실행되도록 처리 필요
        // 2-1. 경매 최종 낙찰자가 존재하는 경우
        //      -> 관련 DB 데이터 생성(거래, 채팅, 가상계좌 생성, 낙찰자 제외한 입찰 참여자 포인트 원복 등등) + 알림 SNS
        // 2-2. 경매 최종 낙찰자가 존재하지 않은 경우
        //      -> 관련 DB 데이터 수정(포인트 원복, 관련 경매 DB 데이터 비활성화, 입찰 참여자 포인트 원복 등등) + 알림 SNS
    }

}
