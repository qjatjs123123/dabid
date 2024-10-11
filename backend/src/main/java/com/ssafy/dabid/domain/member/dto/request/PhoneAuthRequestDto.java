package com.ssafy.dabid.domain.member.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.NumberFormat;

@Getter
@Setter
@NoArgsConstructor
public class PhoneAuthRequestDto {
    @NotBlank
    @Pattern(regexp = "^010[-\\s]?\\d{4}[-\\s]?\\d{4}$")
    private String phoneNumber;
}
