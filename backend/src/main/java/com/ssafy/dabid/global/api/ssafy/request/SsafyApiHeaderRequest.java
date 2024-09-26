package com.ssafy.dabid.global.api.ssafy.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SsafyApiHeaderRequest {
    private String apiName;
    private String transmissionDate;
    private String transmissionTime;
    private String institutionCode;
    private String fintechAppNo;
    private String apiServiceCode;
    private String institutionTransactionUniqueNo;
    private String apiKey;
    private String userKey;
}
