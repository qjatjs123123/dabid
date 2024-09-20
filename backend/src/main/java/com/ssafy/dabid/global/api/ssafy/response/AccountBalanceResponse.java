package com.ssafy.dabid.global.api.ssafy.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
import lombok.*;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Getter
@Setter
public class AccountBalanceResponse extends SsafyApiResponse {
    private String bankCode;
    private String accountCreatedDate;
    private String lastTransactionDate;
    private String accountNo;
    private String currency;
    private String accountExpiryDate;
    private Long accountBalance;

    @JsonProperty("REC")
    private void unpackNested(Map<String,String> map) {
        this.bankCode = map.get("bankCode");
        this.accountCreatedDate = map.get("accountCreatedDate");
        this.lastTransactionDate = map.get("lastTransactionDate");
        this.accountNo = map.get("accountNo");
        this.currency = map.get("currency");
        this.accountExpiryDate = map.get("accountExpiryDate");
        this.accountBalance = Long.valueOf(map.get("accountBalance"));
    }
}