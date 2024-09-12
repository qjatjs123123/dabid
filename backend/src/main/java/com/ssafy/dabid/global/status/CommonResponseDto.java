package com.ssafy.dabid.domain.member.dto.response;

import com.ssafy.dabid.global.status.StatusCode;
import com.ssafy.dabid.global.status.StatusMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public class AuthResponseDto {
    private String code;
    private String message;

    public AuthResponseDto() {
        this.code = StatusCode.SUCCESS;
        this.message = StatusMessage.SUCCESS;
    }
}
