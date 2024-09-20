package com.ssafy.dabid.global.api.ssafy;

import com.ssafy.dabid.domain.deal.dto.request.SsafyApiRequest;
import com.ssafy.dabid.global.api.ssafy.request.*;
import com.ssafy.dabid.global.api.ssafy.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static com.ssafy.dabid.global.consts.StaticFunc.serializeToJson;

@Component
@RequiredArgsConstructor
public class SsafyApiClient {
    private final WebClient webClient;
    private static String baseURL = "https://finopenapi.ssafy.io/ssafy/api/v1";

    // 개인 계좌 생성
    public CreateAccountResponse createAccount(CreateAccountRequest request) {
        return getSsafyApiResponse("/edu/demandDeposit/createDemandDepositAccount", request, CreateAccountResponse.class);
    }

    // 유저키 발급
    public GetUserKeyResponse getUserKey(GetUserKeyRequest request) {
        return getSsafyApiResponse("/member", request, GetUserKeyResponse.class);
    }

    // 계좌 입금
    public DepositResponse depositIn(DepositRequest request) {
        return getSsafyApiResponse("/edu/demandDeposit/updateDemandDepositAccountDeposit", request, DepositResponse.class);
    }

    // 계좌 출금
    public DepositResponse depositOut(DepositRequest request) {
        return getSsafyApiResponse("/edu/demandDeposit/updateDemandDepositAccountWithdrawal", request, DepositResponse.class);
    }

    // 거래 내역 조회
    public TransactionHistoryResponse transactionHistory (TransactionHistoryRequest request) {
        return getSsafyApiResponse("/edu/demandDeposit/inquireTransactionHistoryList", request, TransactionHistoryResponse.class);
    }

    // 계좌 잔액 조회
    public AccountBalanceResponse accountBalance (AccountBalanceRequest request) {
        return getSsafyApiResponse("/edu/demandDeposit/inquireDemandDepositAccountBalance", request, AccountBalanceResponse.class);
    }

    // 1원 송금
    public AccountAuthResponse accountAuth (AccountAuthRequest request) {
        return getSsafyApiResponse("/edu/accountAuth/openAccountAuth", request, AccountAuthResponse.class);
    }

    // 1원 송금 인증
    public CheckAuthCodeResponse checkAuth (CheckAuthCodeRequest request) {
        return getSsafyApiResponse("/edu/accountAuth/checkAuthCode", request, CheckAuthCodeResponse.class);
    }

    private <T> T getSsafyApiResponse(String path, SsafyApiRequest ssafyApiRequest, Class<T> responseType) {
        String serializedString = serializeToJson(ssafyApiRequest);
        System.out.println(serializedString);
        return webClient.mutate()
                .baseUrl(baseURL)
                .build()
                .post()
                .uri(uriBuilder -> uriBuilder.path(path).build())
                .bodyValue(serializedString)
                .retrieve()
                .onStatus(HttpStatusCode::isError, clientResponse ->
                        Mono.just(new RuntimeException("error")))
                .bodyToMono(responseType)
                .block();
    }
}
