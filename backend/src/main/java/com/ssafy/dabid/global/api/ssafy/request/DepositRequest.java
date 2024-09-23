package com.ssafy.dabid.global.api.ssafy.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.ssafy.dabid.domain.member.dto.request.CommonApiRequest;
import com.ssafy.dabid.global.api.ssafy.request.SsafyApiHeaderRequest;
import com.ssafy.dabid.global.api.ssafy.request.SsafyApiRequest;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@Builder
public class DepositRequest extends SsafyApiRequest {
    @JsonProperty("Header")
    private SsafyApiHeaderRequest header;
    private String accountNo;
    private String transactionBalance;
    private final String transactionSummary = "다비드";
}
