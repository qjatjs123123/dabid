package com.ssafy.dabid.global.api.ssafy.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.global.api.ssafy.response.SsafyApiHeaderResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SsafyApiResponse<T> {
    @JsonProperty("Header")
    private SsafyApiHeaderResponse header;

    @JsonProperty("REC")
    private T REC;
}
