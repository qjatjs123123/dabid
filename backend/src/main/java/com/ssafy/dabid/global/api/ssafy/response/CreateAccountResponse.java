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

    @JsonProperty("REC")
    private void unpackNested(Map<String,String> map) {
        this.bankCode = map.get("bankCode");
        this.accountNo = map.get("accountNo");
    }
}
