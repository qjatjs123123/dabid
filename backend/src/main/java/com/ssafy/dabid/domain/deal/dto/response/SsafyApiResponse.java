package com.ssafy.dabid.domain.deal.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SsafyApiResponse {
    @JsonProperty("Header")
    private SsafyApiHeaderResponse header;
}
