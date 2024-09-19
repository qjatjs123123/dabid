package com.ssafy.dabid.global.api.ssafy.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiHeaderResponse;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Getter
@Setter
public class CreateAccountResponse {

    @JsonProperty("Header")
    private SsafyApiHeaderResponse header;

    @JsonProperty("REC")
    private Rec rec;

    @Getter
    @Setter
    public static class Rec {
        private String bankCode;
        private String accountNo;
    }
}
