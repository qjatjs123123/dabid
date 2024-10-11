package com.ssafy.dabid.domain.deal.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.dabid.domain.deal.dto.request.CourierRequest;
import com.ssafy.dabid.domain.deal.dto.request.CourierRequestNo;
import com.ssafy.dabid.domain.deal.entity.CarrierId;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static com.ssafy.dabid.global.consts.StaticConst.*;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class DeliveryTrackerAPIClient {
    private final WebClient webClient;
    private static final String baseURL = "https://apis.tracker.delivery/graphql";

    public String trackPackage(CourierRequestNo courierRequest) {
        // GraphQL 쿼리 정의
        String query = "query Track($carrierId: ID!, $trackingNumber: String!) { " +
                "track(carrierId: $carrierId, trackingNumber: $trackingNumber) { " +
                "lastEvent { time status { code } } } }";

        // 변수 설정
        Map<String, Object> variables = new HashMap<>();
        variables.put("carrierId", courierRequest.getCarrierId());
        variables.put("trackingNumber", courierRequest.getTrackingNumber());

        // 요청 바디 구성
        Map<String, Object> body = new HashMap<>();
        body.put("query", query);
        body.put("variables", variables);

        // WebClient를 사용해 요청 보내기
        return webClient.mutate()
                .baseUrl(baseURL)
                .build()
                .post()
                .header(HttpHeaders.AUTHORIZATION, "TRACKQL-API-KEY " + DELIVERY_TRACKER_CLIENT_ID + ":" + DELIVERY_TRACKER_CLIENT_PW)
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(body)
                .retrieve()
                .onStatus(HttpStatusCode::isError, clientResponse ->
                        Mono.error(new RuntimeException("Error response received")))
                .bodyToMono(JsonNode.class)
                .map(jsonNode -> jsonNode
                        .path("data")
                        .path("track")
                        .path("lastEvent")
                        .path("status")
                        .path("code")
                        .asText()) // 'code' 값 추출
                .block(); // 결과 대기
    }
}
