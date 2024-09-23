package com.ssafy.dabid.global.api.ssafy;

import com.ssafy.dabid.domain.deal.dto.request.SsafyApiHeaderRequest;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiRequest;
import com.ssafy.dabid.global.api.ssafy.request.*;
import com.ssafy.dabid.global.api.ssafy.response.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static com.ssafy.dabid.global.consts.StaticConst.*;
import static com.ssafy.dabid.global.consts.StaticFunc.getSsafyApiHeaderRequest;
import static com.ssafy.dabid.global.consts.StaticFunc.serializeToJson;

@Slf4j
@Component
@RequiredArgsConstructor
public class SsafyApiClient {
    private final WebClient webClient;
    private static String baseURL = "https://finopenapi.ssafy.io/ssafy/api/v1";

    // 유저키 발급, 별도의 req/res DTO 사용
    public GetUserKeyResponse registerUserKey(String userId) {

        SsafyApiRequest request = SsafyApiRequest.builder()
                .userId(userId)
                .apiKey(apiKey)
                .build();

        return getSsafyApiResponse("/member", request, GetUserKeyResponse.class);
    }

    // 개인 계좌 생성
    public CreateAccountResponse createAccount(String userKey) {

        SsafyApiRequest request = SsafyApiRequest.builder()
                .header(generateHeader(CREATE_DEMAND_DEPOSIT_ACCOUNT_CODE, userKey))
                .accountTypeUniqueNo(ACCOUNT_TYPE_UNIQUE_NO)
                .build();

        return getSsafyApiResponse("/edu/demandDeposit/createDemandDepositAccount", request, CreateAccountResponse.class);
    }

    /**
     * @param accountNo 입금 계좌
     * */
    // 계좌 입금
    public DepositResponse depositIn(String userKey, String accountNo, String transactionBalance) {

        SsafyApiRequest request = SsafyApiRequest.builder()
                .header(generateHeader(DEPOSIT_IN_CODE, userKey))
                .accountNo(accountNo)
                .transactionBalance(transactionBalance)
                .build();

        return getSsafyApiResponse("/edu/demandDeposit/updateDemandDepositAccountDeposit", request, DepositResponse.class);
    }

    /**
     * @param accountNo 출금 계좌
     * */
    // 계좌 출금
    public DepositResponse depositOut(String userKey, String accountNo, String transactionBalance) {

        SsafyApiRequest request = SsafyApiRequest.builder()
                .header(generateHeader(DEPOSIT_OUT_CODE, userKey))
                .accountNo(accountNo)
                .transactionBalance(transactionBalance)
                .build();

        return getSsafyApiResponse("/edu/demandDeposit/updateDemandDepositAccountWithdrawal", request, DepositResponse.class);
    }

    /**
     * @param depositAccountNo 입급 계좌
     * @param withdrawalAccountNo 출금 계좌
     * */
    // 계좌 이체
    public TransferResponse deposit(String userKey, String depositAccountNo, String withdrawalAccountNo, String transactionBalance) {

        SsafyApiRequest request = SsafyApiRequest.builder()
                .header(generateHeader(TRANSFER_CODE, userKey))
                .depositAccountNo(depositAccountNo)
                .withdrawalAccountNo(withdrawalAccountNo)
                .transactionBalance(transactionBalance)
                .build();

        return getSsafyApiResponse("/edu/demandDeposit/updateDemandDepositAccountTransfer", request, TransferResponse.class);
    }

    // 거래 내역 조회
    public TransactionHistoryResponse transactionHistory (String userKey, String accountNo) {

        SsafyApiRequest request = SsafyApiRequest.builder()
                .header(generateHeader(TRANSACTION_HISTORY_CODE, userKey))
                .accountNo(accountNo)
                .startDate(START_DATE)
                .endDate(END_DATE)
                .transactionType(TRANSACTION_TYPE)
                .orderByType(ORDER_BY_TYPE)
                .build();

        return getSsafyApiResponse("/edu/demandDeposit/inquireTransactionHistoryList", request, TransactionHistoryResponse.class);
    }

    // 계좌 잔액 조회
    public AccountBalanceResponse accountBalance (String userKey, String accountNo) {

        SsafyApiRequest request = SsafyApiRequest.builder()
                .header(generateHeader(ACCOUNT_BALANCE_CODE, userKey))
                .accountNo(accountNo)
                .build();

        return getSsafyApiResponse("/edu/demandDeposit/inquireDemandDepositAccountBalance", request, AccountBalanceResponse.class);
    }

    // 1원 송금
    public AccountAuthResponse accountAuth (String userKey, String accountNo) {
        SsafyApiRequest request = SsafyApiRequest.builder()
                .header(generateHeader(ACCOUNT_AUTH_CODE, userKey))
                .accountNo(accountNo)
                .authText(AUTH_TEXT)
                .build();

        return getSsafyApiResponse("/edu/accountAuth/openAccountAuth", request, AccountAuthResponse.class);
    }

    // 1원 송금 인증
    public CheckAuthCodeResponse checkAuth (String userKey, String accountNo, String authCode) {
        SsafyApiRequest request = SsafyApiRequest.builder()
                .header(generateHeader(CHECK_AUTH_CODE, userKey))
                .accountNo(accountNo)
                .authText(AUTH_TEXT)
                .authCode(authCode)
                .build();

        return getSsafyApiResponse("/edu/accountAuth/checkAuthCode", request, CheckAuthCodeResponse.class);
    }

    private SsafyApiHeaderRequest generateHeader(String code, String userKey){
        return getSsafyApiHeaderRequest(code, code, userKey);
    }

    public <T> T getSsafyApiResponse(String path, SsafyApiRequest ssafyApiRequest, Class<T> responseType) {
    //private <T> T getSsafyApiResponse(String path, SsafyApiRequest ssafyApiRequest, Class<T> responseType) {
        String serializedString = serializeToJson(ssafyApiRequest);

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
