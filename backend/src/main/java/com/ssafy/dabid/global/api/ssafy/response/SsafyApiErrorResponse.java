package com.ssafy.dabid.global.api.ssafy.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SsafyApiErrorResponse {
    private String responseCode;
    private String responseMessage;
}
