package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.domain.deal.dto.request.SsafyApiRequest;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static com.ssafy.dabid.global.consts.StaticConst.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SsafyApiClientTest {
    @Autowired
    SsafyApiClient ssafyApiClient;

    @Test
    void 유저키받기(){
        SsafyApiRequest request = new SsafyApiRequest(apiKey, "xorjsghkd1013@gmail.com");
        SsafyApiResponse ssafyApiResponse = ssafyApiClient.getSsafyApiResponse("member", request);
        System.out.println("ssafyApiResponse.getREC() = " + ssafyApiResponse.getREC());
    }
}