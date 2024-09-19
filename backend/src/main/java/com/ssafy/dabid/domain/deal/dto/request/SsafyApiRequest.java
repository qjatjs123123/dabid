package com.ssafy.dabid.domain.deal.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SsafyApiRequest {
//    @JsonProperty("Header")
//    private SsafyApiHeaderRequest header;

//    private String accountNo;
//    private Object transactionBalance;
//    private String transactionSummary;
//    private String depositAccountNo;
//    private String depositTransactionSummary;
//    private String withdrawalAccountNo;
//    private String withdrawalTransactionSummary;
//    private String accountTypeUniqueNo;

    private String apiKey;
    private String userId;
}
