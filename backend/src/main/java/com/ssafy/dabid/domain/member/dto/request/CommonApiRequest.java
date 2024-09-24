package com.ssafy.dabid.domain.member.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.global.api.ssafy.request.SsafyApiHeaderRequest;

public abstract class CommonApiRequest {
    @JsonProperty("Header")
    private SsafyApiHeaderRequest header;
}
