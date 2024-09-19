package com.ssafy.dabid.domain.deal.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiHeaderRequest;
import com.ssafy.dabid.domain.member.service.AccountBalanceResponse.Rec;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
public class SsafyApiResponse {

    @JsonProperty("Header")
    private SsafyApiHeaderResponse header;

    @JsonProperty("REC")
    private Rec rec;

}
