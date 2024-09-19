package com.ssafy.dabid.global.config;

import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

import static com.ssafy.dabid.global.consts.StaticConst.MAX_MEMORY_SIZE;
import static com.ssafy.dabid.global.consts.StaticConst.ONE_MINUTE;
import static org.springframework.http.HttpHeaders.ACCEPT;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Configuration
public class WebClientConfig {
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .defaultHeaders(httpHeaders -> {
                    httpHeaders.set(CONTENT_TYPE, APPLICATION_JSON_VALUE);
                    httpHeaders.set(ACCEPT, APPLICATION_JSON_VALUE);
                })
                .codecs(clientCodecConfigurer ->
                        clientCodecConfigurer.defaultCodecs().maxInMemorySize(MAX_MEMORY_SIZE)
                )
                .clientConnector(
                        new ReactorClientHttpConnector(HttpClient.create()
                                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, Long.valueOf(ONE_MINUTE).intValue())
                                .responseTimeout(Duration.ofMillis(ONE_MINUTE))
                                .doOnConnected(connection -> {
                                    connection.addHandlerLast(new ReadTimeoutHandler(ONE_MINUTE, TimeUnit.MILLISECONDS));
                                    connection.addHandlerLast(new WriteTimeoutHandler(ONE_MINUTE, TimeUnit.MILLISECONDS));
                                })
                        )
                )
                .build();
//        return WebClient.builder()
//                .baseUrl("https://finopenapi.ssafy.io/ssafy/api/v1")
//                .build();
    }

}
