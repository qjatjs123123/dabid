package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.domain.deal.dto.request.SsafyApiHeaderRequest;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiRequest;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static com.ssafy.dabid.global.consts.StaticConst.*;
import static com.ssafy.dabid.global.consts.StaticFunc.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SsafyApiClientTest {
    @Autowired
    SsafyApiClient ssafyApiClient;

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
        System.out.println("response = " + response.getREC());
    }
}