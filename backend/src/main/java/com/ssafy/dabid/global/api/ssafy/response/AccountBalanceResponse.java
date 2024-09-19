package com.ssafy.dabid.global.api.ssafy.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Getter
@Setter
public class AccountBalanceResponse extends SsafyApiResponse {

    @Getter
    @Setter
    public static class Rec {
        private String bankCode;
        private String accountCreatedDate;
        private String lastTransactionDate;
        private String accountNo;
        private String currency;
        private String accountExpiryDate;
        private String accountBalance;
    }

}