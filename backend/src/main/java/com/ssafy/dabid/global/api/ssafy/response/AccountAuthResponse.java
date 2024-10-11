package com.ssafy.dabid.global.api.ssafy.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.global.api.ssafy.response.SsafyApiHeaderResponse;
import com.ssafy.dabid.global.api.ssafy.response.SsafyApiResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Getter
@Setter
public class AccountAuthResponse {

    @JsonProperty("Header")
    private SsafyApiHeaderResponse header;

    @JsonProperty("REC")
    private Rec rec;

    @Getter
    @Setter
    @NoArgsConstructor  // 기본 생성자 추가
    public static class Rec {
        private String transactionUnique;
        private String accountNo;
    }

}
