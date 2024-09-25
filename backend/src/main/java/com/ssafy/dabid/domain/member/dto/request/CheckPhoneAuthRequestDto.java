package com.ssafy.dabid.domain.member.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CheckPhoneAuthRequestDto {
    private String phoneNumber;
    private String code;
}
