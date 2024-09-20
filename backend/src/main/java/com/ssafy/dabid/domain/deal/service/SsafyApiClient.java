//package com.ssafy.dabid.domain.deal.service;
//
//import com.ssafy.dabid.domain.deal.dto.request.SsafyApiRequest;
//import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatusCode;
//import org.springframework.stereotype.Component;
//import org.springframework.web.reactive.function.client.WebClient;
//import reactor.core.publisher.Mono;
//
//import static com.ssafy.dabid.global.consts.StaticFunc.*;
//
//@Component
//@RequiredArgsConstructor
//public class SsafyApiClient {
//    private final WebClient webClient;
//    private static final String baseURL = "https://finopenapi.ssafy.io/ssafy/api/v1/edu/demandDeposit";
//
//    // 수정된 메서드
//    public <T> T getSsafyApiResponse(String path, SsafyApiRequest ssafyApiRequest, Class<T> responseType) {
//        String serialLizeString = serializeToJson(ssafyApiRequest);
//        System.out.println(serialLizeString);
//        return webClient.mutate()
//                .baseUrl(baseURL)
//                .build()
//                .post()
//                .uri("/{path}", path)
//                .bodyValue(serialLizeString)
//                .retrieve()
//                .onStatus(HttpStatusCode::isError, clientResponse ->
//                        Mono.error(new RuntimeException("Error response received")))
//                .bodyToMono(responseType)
//                .block();
//    }
//}
