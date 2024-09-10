package com.ssafy.dabid.global.config;

import org.quartz.Scheduler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

@Configuration
public class QuartzConfig {

    @Bean
    public Scheduler scheduler(SchedulerFactoryBean factory) {
        return factory.getScheduler();
    }
}
