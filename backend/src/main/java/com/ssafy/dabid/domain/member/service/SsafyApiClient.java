package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.domain.deal.dto.request.CommonApiRequest;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiRequest;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
import com.ssafy.dabid.domain.member.dto.request.CommonApiRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Optional;

import static com.ssafy.dabid.global.consts.StaticFunc.*;

@Component
@RequiredArgsConstructor
public class SsafyApiClient {
    private final WebClient webClient;
    private static String baseURL = "https://finopenapi.ssafy.io/ssafy/api/v1";

    public CreateAccountResponse createAccount(CreateAccountRequest request) {
        return getSsafyApiResponse("/edu/demandDeposit/createDemandDepositAccount", request, CreateAccountResponse.class);
    }
//    public apiResponse1 callApi1(){
//        getSsafyApiResponse(path1, requestDto1, responseType1.class);
//    }
//
//    public apiResponse2 callApi2(){
//        getSsafyApiResponse(path2, requestDto2, responseType2.class);
//    }
//
/*    public SsafyApiResponse getUserkey(SsafyApiRequest request){
        return getSsafyApiResponse("member", request, SsafyApiResponse.class);
    }*/

    private <T> T getSsafyApiResponse(String path, CommonApiRequest ssafyApiRequest, Class<T> responseType) {
        String serialLizeString = serializeToJson(ssafyApiRequest);

        return webClient.mutate()
                .baseUrl(baseURL)
                .build()
                .post()
                .uri(uriBuilder -> uriBuilder.path(path).build())
                .bodyValue(serialLizeString)
                .retrieve()
                .onStatus(HttpStatusCode::isError, clientResponse ->
                        Mono.just(new RuntimeException("error")))
                .bodyToMono(responseType)
                .block();
    }

//    public SsafyApiResponse getSsafyApiResponse(String path, SsafyApiRequest ssafyApiRequest) {
//        String serialLizeString = serializeToJson(ssafyApiRequest);
//        System.out.println("serialLizeString = " + serialLizeString);
//
//        return webClient.mutate()
//                .baseUrl(baseURL)
//                .build()
//                .post()
//                .uri("/{path}", path)
//                .bodyValue(serialLizeString)
//                .retrieve()
//                .onStatus(HttpStatusCode::isError, clientResponse ->
//                        Mono.just(new RuntimeException("error")))
//                .bodyToMono(SsafyApiResponse.class)
//                .block();
//    }
//


}
