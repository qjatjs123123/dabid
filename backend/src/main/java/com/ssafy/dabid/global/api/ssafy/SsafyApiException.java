package com.ssafy.dabid.global.api.ssafy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SsafyApiException extends RuntimeException {
    private String code;
    private String message;
}
