package com.ssafy.dabid.global.config;

import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

public class ResTemplateConfig {
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
