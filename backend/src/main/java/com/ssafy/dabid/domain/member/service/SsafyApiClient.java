package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.domain.deal.dto.request.CommonApiRequest;
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

    // 개인 계좌 생성
    public SsafyApiResponse createAccount(CreateAccountRequest request) {
        return getSsafyApiResponse("/edu/demandDeposit/createDemandDepositAccount", request, SsafyApiResponse.class);
    }

    // 유저키 발급
    public GetUserKeyResponse registerUserKey(GetUserKeyRequest request) {
        return getSsafyApiResponse("/member", request, GetUserKeyResponse.class);
    }

    // 계좌 입금
    public SsafyApiResponse depositIn(DepositRequest request) {
        return getSsafyApiResponse("/edu/demandDeposit/updateDemandDepositAccountDeposit", request, SsafyApiResponse.class);
    }

    // 계좌 출금
    public SsafyApiResponse depositOut(DepositRequest request) {
        return getSsafyApiResponse("/edu/demandDeposit/updateDemandDepositAccountWithdrawal", request, SsafyApiResponse.class);
    }

    // 거래 내역 조회
    public SsafyApiResponse transactionHistory (TransactionHistoryRequest request) {
        return getSsafyApiResponse("/edu/demandDeposit/inquireTransactionHistoryList", request, SsafyApiResponse.class);
    }

    // 계좌 잔액 조회
    public AccountBalanceResponse accountBalance (AccountBalanceRequest request) {
        return getSsafyApiResponse("/edu/demandDeposit/inquireDemandDepositAccountBalance", request, AccountBalanceResponse.class);
    }

    private <T> T getSsafyApiResponse(String path, CommonApiRequest ssafyApiRequest, Class<T> responseType) {
        String serialLizeString = serializeToJson(ssafyApiRequest);
        System.out.println("serialLizeString = " + serialLizeString);

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
