package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.domain.deal.dto.request.SsafyApiHeaderRequest;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
import com.ssafy.dabid.global.api.ssafy.SsafyApiClient;
import com.ssafy.dabid.global.api.ssafy.request.*;
import com.ssafy.dabid.global.api.ssafy.response.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static com.ssafy.dabid.global.consts.StaticConst.*;
import static com.ssafy.dabid.global.consts.StaticFunc.*;

@SpringBootTest
class SsafyApiClientTest {
    @Autowired
    SsafyApiClient ssafyApiClient;

//    @Test
//    void 유저키받기() {
//        GetUserKeyRequest getUserKeyRequest = new GetUserKeyRequest();
//        getUserKeyRequest.setUserId("test001@test.com");
//        GetUserKeyResponse response = ssafyApiClient.registerUserKey(getUserKeyRequest);
//        System.out.println("response = " + response.getUserKey());
//    }

    @Test
    void 계좌만들기(){
        CreateAccountRequest createAccountRequest = new CreateAccountRequest();

        String userKey = "7dfbfe9f-755c-4e43-ac4c-cd15998085fd";

        SsafyApiHeaderRequest header = getSsafyApiHeaderRequest(
                CREATE_DEMAND_DEPOSIT_ACCOUNT_CODE,
                CREATE_DEMAND_DEPOSIT_ACCOUNT_CODE,
                userKey);

        createAccountRequest.setHeader(header);

        CreateAccountResponse response = ssafyApiClient.createAccount(createAccountRequest);
        System.out.println("response = " + response.getHeader());
    }

    @Test
    void 입금() {
        DepositRequest depositRequest = new DepositRequest();
        String userKey = "7dfbfe9f-755c-4e43-ac4c-cd15998085fd";

        SsafyApiHeaderRequest header = getSsafyApiHeaderRequest(
                DEPOSIT_IN_CODE,
                DEPOSIT_IN_CODE,
                userKey);

        depositRequest.setHeader(header);
        depositRequest.setAccountNo("0018520954400580");
        depositRequest.setTransactionBalance("1000000");

        DepositResponse response = ssafyApiClient.depositIn(depositRequest);
        System.out.println("response = " + response);
    }

    @Test
    void 출금() {
        DepositRequest depositRequest = new DepositRequest();
        String userKey = "7dfbfe9f-755c-4e43-ac4c-cd15998085fd";

        SsafyApiHeaderRequest header = getSsafyApiHeaderRequest(
                DEPOSIT_OUT_CODE,
                DEPOSIT_OUT_CODE,
                userKey);

        depositRequest.setHeader(header);
        depositRequest.setAccountNo("0018520954400580");
        depositRequest.setTransactionBalance("100");

        DepositResponse response = ssafyApiClient.depositOut(depositRequest);
        System.out.println("response = " + response);
    }

    @Test
    void 계좌거래내역조회() {
        TransactionHistoryRequest transactionHistoryRequest = new TransactionHistoryRequest();
        String userKey = "7dfbfe9f-755c-4e43-ac4c-cd15998085fd";

        SsafyApiHeaderRequest header = getSsafyApiHeaderRequest(
                TRANSACTION_HISTORY_CODE,
                TRANSACTION_HISTORY_CODE,
                userKey);
        transactionHistoryRequest.setHeader(header);
        transactionHistoryRequest.setAccountNo("0018520954400580");

        TransactionHistoryResponse response = ssafyApiClient.transactionHistory(transactionHistoryRequest);
        System.out.println("response = " + response);
        System.out.println("response.Rec.List.size = " + response.getRec().getList().size());
        response.getRec().getList().forEach(item -> System.out.println(item.getTransactionUniqueNo() + " " + item.getTransactionTypeName()));
    }

    @Test
    void 계좌잔액조회() {
        AccountBalanceRequest accountBalanceRequest = new AccountBalanceRequest();
        String userKey = "7dfbfe9f-755c-4e43-ac4c-cd15998085fd";

        SsafyApiHeaderRequest header = getSsafyApiHeaderRequest(
                ACCOUNT_BALANCE_CODE,
                ACCOUNT_BALANCE_CODE,
                userKey);
        accountBalanceRequest.setHeader(header);
        accountBalanceRequest.setAccountNo("0018520954400580");

        AccountBalanceResponse response = ssafyApiClient.accountBalance(accountBalanceRequest);
        System.out.println("response = " + response.getAccountBalance());
        System.out.println("response = " + response.getHeader().getResponseMessage());
    }

}