package com.ssafy.dabid.domain.member.service;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
import lombok.*;
import net.minidev.json.JSONObject;


@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Getter
@Setter
public class AccountBalanceResponse extends SsafyApiResponse {

    @Getter
    @Setter
    public static class Rec {
        @JsonProperty("bankCode")
        private String bankCode;

        @JsonProperty("accountCreatedDate")
        private String accountCreatedDate;

        @JsonProperty("lastTransactionDate")
        private String lastTransactionDate;

        @JsonProperty("accountNo")
        private String accountNo;

        @JsonProperty("currency")
        private String currency;

        @JsonProperty("accountExpiryDate")
        private String accountExpiryDate;

        @JsonProperty("accountBalance")
        private String accountBalance;
    }

}