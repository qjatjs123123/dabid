package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.global.api.ssafy.SsafyApiClient;
import com.ssafy.dabid.global.api.ssafy.response.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class SsafyApiClientTest {
    @Autowired
    SsafyApiClient ssafyApiClient;

    @Test
    void 유저키받기() {
        String userId = "test3120011@test.com";
        GetUserKeyResponse response = ssafyApiClient.registerUserKey(userId);
        System.out.println("response = " + response.getUserKey());
    }

    @Test
    void 계좌만들기(){
        String userKey = "7dfbfe9f-755c-4e43-ac4c-cd15998085fd";

        CreateAccountResponse response = ssafyApiClient.createAccount(userKey);
        System.out.println("response = " + response.getHeader());
        System.out.println("response = " + response.getRec().getAccountNo());
    }

    @Test
    void 입금() {
        String userKey = "937d7d39-eccc-4741-bf54-af154e279537";

        String accountNo = "0016368455041861";
        String transactionBalance = "1000";

        DepositResponse response = ssafyApiClient.depositIn(userKey, accountNo, transactionBalance);
        System.out.println("결과 : " + response.getHeader().getResponseMessage());
    }

    @Test
    void 출금() {
        String userKey = "937d7d39-eccc-4741-bf54-af154e279537";

        String accountNo = "0016368455041861";
        String transactionBalance = "1000";

        DepositResponse response = ssafyApiClient.depositOut(userKey, accountNo, transactionBalance);
        System.out.println("response = " + response.getRec().getTransactionUniqueNo());
    }

    @Test
    void 계좌거래내역조회() {
        String userKey = "8eb95dff-2fed-4323-b9e0-af4f1b295a10";

        String accountNo = "0017999083224741";

        TransactionHistoryResponse response = ssafyApiClient.transactionHistory(userKey, accountNo);
        System.out.println("response.Rec.List.size = " + response.getRec().getList().size());
        response.getRec().getList().forEach(item -> System.out.println(item.getTransactionUniqueNo() + " " + item.getTransactionTypeName() + " " + item.getTransactionSummary()));
    }

    @Test
    void 계좌잔액조회() {
        String userKey = "8eb95dff-2fed-4323-b9e0-af4f1b295a10";
        String accountNo = "0017999083224741";

        AccountBalanceResponse response = ssafyApiClient.accountBalance(userKey, accountNo);
        System.out.println("response = " + response.getRec().getAccountBalance());
        System.out.println("response = " + response.getHeader().getResponseMessage());
    }

    @Test
    void 계좌1원송금() {

        String userKey = "7dfbfe9f-755c-4e43-ac4c-cd15998085fd";
        String accountNo = "0018520954400580";

        AccountAuthResponse response = ssafyApiClient.accountAuth(userKey, accountNo);
        System.out.println("response = " + response.getHeader().getResponseMessage());
        System.out.println("response = " + response.getRec().getAccountNo());
    }

    @Test
    void 계좌1원송금검증() {
        String userKey = "7dfbfe9f-755c-4e43-ac4c-cd15998085fd";
        String accountNo = "0018520954400580";
        String authCode = "7361";

        CheckAuthCodeResponse response = ssafyApiClient.checkAuth(userKey, accountNo, authCode);
        assertEquals("SUCCESS", response.getRec().getStatus());
    }
    
    @Test
    void 유저키생성_계좌생성_계좌인증(){

        //유저키 발급
        String email = "rPwhkdlswmdemrkwk@gmail.com";
        GetUserKeyResponse keyResponse = ssafyApiClient.registerUserKey(email);
        String userKey = keyResponse.getUserKey();

        //계좌 생성
        CreateAccountResponse accountResponse = ssafyApiClient.createAccount(userKey);
        String accountNo = accountResponse.getRec().getAccountNo();

        //1원 송금
        AccountAuthResponse response1 = ssafyApiClient.accountAuth(userKey, accountNo);
        assertEquals("H0000", response1.getHeader().getResponseCode());
        
        //첫 번째 거래내역에서 인증코드 추출
        TransactionHistoryResponse response2 = ssafyApiClient.transactionHistory(userKey, accountNo);

        String summary = response2.getRec().getList().get(0).getTransactionSummary();
        String authCode = summary.substring(summary.length() - 4);

        //인증코드 비교
        CheckAuthCodeResponse response3 = ssafyApiClient.checkAuth(userKey, accountNo, authCode);
        assertEquals("SUCCESS", response3.getRec().getStatus());
    }

    @Test
    void 계좌이체() {
        String userKey = "7dfbfe9f-755c-4e43-ac4c-cd15998085fd"; // 출금 계좌 예금주 userkey
        String depositAccountNo = "0016368455041861";
        String withdrawalAccountNo = "0018520954400580";
        String transactionBalance = "10000";

        TransferResponse response = ssafyApiClient.deposit(userKey, depositAccountNo, withdrawalAccountNo, transactionBalance);
        System.out.println("response = " + response);
        System.out.println("response.Rec.List.size = " + response.getRec().size());
        response.getRec().forEach(item -> System.out.println(item.getAccountNo() + " " + item.getTransactionTypeName()));
    }
}