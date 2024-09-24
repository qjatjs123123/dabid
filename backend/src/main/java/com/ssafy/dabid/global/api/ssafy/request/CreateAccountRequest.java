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
public class CreateAccountRequest extends SsafyApiRequest {
    @JsonProperty("Header")
    private SsafyApiHeaderRequest header;

    private final String accountTypeUniqueNo = "001-1-70ebcf49336a47";
}
