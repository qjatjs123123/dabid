package com.ssafy.dabid.domain.member.service;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.domain.deal.dto.request.CommonApiRequest;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiHeaderRequest;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DepositRequest extends CommonApiRequest {
    @JsonProperty("Header")
    private SsafyApiHeaderRequest header;

    private String accountNo;
    private String transactionBalance;
    private final String transactionSummary = "다비드";
}
