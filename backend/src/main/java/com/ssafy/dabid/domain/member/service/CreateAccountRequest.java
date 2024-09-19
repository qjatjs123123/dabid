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
public class CreateAccountRequest extends CommonApiRequest {
    @JsonProperty("Header")
    private SsafyApiHeaderRequest header;

    private final String accountTypeUniqueNo = "001-1-70ebcf49336a47";
}
