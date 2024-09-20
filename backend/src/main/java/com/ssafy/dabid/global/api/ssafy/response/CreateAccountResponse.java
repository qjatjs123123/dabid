package com.ssafy.dabid.global.api.ssafy.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
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
    private void unpackNested(Map<String, Object> rec) {
        this.bankCode = (String) rec.get("bankCode");
        this.accountNo = (String) rec.get("accountNo");
        Map<String, String> currencyMap = (Map<String, String>) rec.get("currency");
        this.currency = new Currency();
        this.currency.currency = currencyMap.get("currency");
        this.currency.currencyName = currencyMap.get("currencyName");
    }

    private static class Currency {
        private String currency;
        private String currencyName;
    }
}
