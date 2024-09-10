package com.ssafy.dabid.domain.job.service;

import com.ssafy.dabid.domain.job.component.DavidJob;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class QuartzSchedulerService {

    private final Scheduler scheduler;

    // 경매 진행 시간 만료
    public void endAuctionAndMakeDeal(int auctionId, LocalDateTime createdAt, LocalDateTime finishedAt) throws SchedulerException {

        // 1. Trigger 고유 이름을 생성하기 위한 auction
        String jobId = "auction"+auctionId;

        // 2. Trigger가 발생했을 때 실행할 Job Schedule에 사용할 데이터 정보(경매 PK) 저장
        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put("auction", auctionId);

        // 3. 각각의 Job Schedule마다 세부설정이 다를 수 있기에 구분을 위한 JobDetail 생성
        JobDetail jobDetail = JobBuilder.newJob(DavidJob.class)
                .withIdentity(jobId, "endAuctionJob")
                .setJobData(jobDataMap)
                .build();

        // 4. trigger에 타이머 설정(경매 종료까지 남은 시간)을 위한 Date 생성
        Duration duration = Duration.between(createdAt, finishedAt);
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.SECOND, (int) duration.getSeconds());
        Date endAuctionTime = calendar.getTime();

        // 5. trigger 생성(고유번호 + 타이머)
        Trigger trigger = TriggerBuilder.newTrigger()
                .withIdentity("trigger-" + jobId, "endAuctionTriggers")
                .startAt(endAuctionTime)
                .withSchedule(SimpleScheduleBuilder.simpleSchedule())
                .build();

        // 6. jobSchedule을 trigger를 만족할 때 실행하도록 스케쥴러에 등록
        scheduler.scheduleJob(jobDetail, trigger);
    }

    // 경매 진행 시간 만료 시 실행되는 Job 삭제(Job에 연결된 Trigger도 같이 삭제 적용)
    public boolean deleteAuctionJob(int auctionId) throws SchedulerException {
        String jobId = "auction"+auctionId;
        JobKey jobKey = new JobKey(jobId, "endAuctionJob");
        return scheduler.deleteJob(jobKey);  // true -> 삭제 성공
    }

    // 경매 진행 시간 만료 시 실행되는 Trigger만 삭제(Job은 삭제 X)
    public boolean deleteAuctionTrigger(int auctionId) throws SchedulerException {
        String jobId = "auction"+auctionId;
        TriggerKey triggerKey = new TriggerKey("trigger-" + jobId, "timeoutTriggers");
        return scheduler.unscheduleJob(triggerKey);  // true -> 삭제 성공
    }
}
