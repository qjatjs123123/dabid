package com.ssafy.dabid.domain.member.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PhoneAuthRequestDto {
    @NotBlank
    private String phoneNumber;
}
