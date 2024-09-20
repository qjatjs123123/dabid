package com.ssafy.dabid.global.api.ssafy.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiRequest;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiHeaderRequest;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AccountBalanceRequest extends SsafyApiRequest {
    @JsonProperty("Header")
    private SsafyApiHeaderRequest header;

    private String accountNo;
}
