package com.ssafy.dabid.global.config;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CoolSMSConfig {

    private static final String API_KEY = "NCSVM9LZZQ6YP3X5";
    private static final String API_SECRET_KEY = "8WRPICX5BCTVFHIORH0ECM0KPXRYZGFO";
    public static final String SENDER = "01066406343";

    @Bean
    public static DefaultMessageService messageService(){
        return NurigoApp.INSTANCE.initialize(API_KEY, API_SECRET_KEY, "https://api.coolsms.co.kr");
    }
}
