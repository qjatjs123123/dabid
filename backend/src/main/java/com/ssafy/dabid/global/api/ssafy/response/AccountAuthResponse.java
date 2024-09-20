package com.ssafy.dabid.global.api.ssafy.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Getter
@Setter
public class AccountAuthResponse extends SsafyApiResponse {

    private String transactionUnique;
    private String accountNo;

    @JsonProperty("REC")
    private void unpackNested(Map<String,String> map) {
        this.transactionUnique = map.get("transactionUnique");
        this.accountNo = map.get("accountNo");
    }
}
