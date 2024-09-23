package com.ssafy.dabid.global.api.ssafy.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.global.api.ssafy.request.SsafyApiHeaderRequest;
import com.ssafy.dabid.global.api.ssafy.request.SsafyApiRequest;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@Builder
public class TransferRequest extends SsafyApiRequest {
    @JsonProperty("Header")
    private SsafyApiHeaderRequest header;

    private String depositAccountNo;
    private final String depositTransactionSummary = "다비드 포인트 환급";
    private String transactionBalance;
    private String withdrawalAccountNo;
    private final String withdrawalTransactionSummary = "다비드 포인트 충전";

}
