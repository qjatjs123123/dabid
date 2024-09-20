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
public class DepositResponse extends SsafyApiResponse {
    private String transactionUniqueNo;
    private String transactionDate;

    @JsonProperty("REC")
    private void unpackNested(Map<String,String> map) {
        this.transactionUniqueNo = map.get("transactionUniqueNo");
        this.transactionDate = map.get("transactionDate");
    }
}
