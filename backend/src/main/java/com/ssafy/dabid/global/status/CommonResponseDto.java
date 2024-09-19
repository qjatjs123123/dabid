package com.ssafy.dabid.global.status;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommonResponseDto {
    private String code;
    private String message;

    public CommonResponseDto() {
        this.code = StatusCode.SUCCESS;
        this.message = StatusMessage.SUCCESS;
    }

    public static CommonResponseDto fail() {
        return new CommonResponseDto(StatusCode.VALIDATION_FAIL, StatusMessage.VALIDATION_FAIL);
    }
}
