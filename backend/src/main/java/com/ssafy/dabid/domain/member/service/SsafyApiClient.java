package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.domain.deal.dto.request.SsafyApiRequest;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static com.ssafy.dabid.global.consts.StaticFunc.*;

@Component
@RequiredArgsConstructor
public class SsafyApiClient {
    private final WebClient webClient;
    private static String baseURL = "https://finopenapi.ssafy.io/ssafy/api/v1";

    public SsafyApiResponse getSsafyApiResponse(String path, SsafyApiRequest ssafyApiRequest) {
        String serialLizeString = serializeToJson(ssafyApiRequest);
        System.out.println("serialLizeString = " + serialLizeString);

        return webClient.mutate()
                .baseUrl(baseURL)
                .build()
                .post()
                .uri("/{path}", path)
                .bodyValue(serialLizeString)
                .retrieve()
                .onStatus(HttpStatusCode::isError, clientResponse ->
                        Mono.just(new RuntimeException("error")))
                .bodyToMono(SsafyApiResponse.class)
                .block();
    }
}
