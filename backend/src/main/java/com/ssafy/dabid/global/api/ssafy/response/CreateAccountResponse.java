package com.ssafy.dabid.global.api.ssafy.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiHeaderResponse;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
import lombok.*;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Getter
@Setter
public class CreateAccountResponse extends SsafyApiResponse {
    private String bankCode;
    private String accountNo;
    private Currency currency;

    @JsonProperty("REC")
    private void unpackNested(Map<String,Object> map) {
        this.bankCode = String.valueOf(map.get("bankCode"));
        this.accountNo = String.valueOf(map.get("accountNo"));
        Map<String, String> currencyMap = (Map<String, String>) map.get("currency");
        this.currency = new Currency(currencyMap.get("currency"), currencyMap.get("currencyName"));
    }

    @AllArgsConstructor
    @Getter
    private static class Currency {
        private String currency;
        private String currencyName;
    }
}
