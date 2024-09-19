package com.ssafy.dabid.global.api.ssafy.request;

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
public class TransactionHistoryRequest extends CommonApiRequest {
    @JsonProperty("Header")
    private SsafyApiHeaderRequest header;

    private String accountNo;
    private final String startDate = "20240901";
    private final String endDate = "20241231";
    private final String transactionType = "A";
    private final String orderByType = "DESC";
}