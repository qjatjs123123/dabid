package com.ssafy.dabid.domain.member.dto.request;

import lombok.Getter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignInRequestDto {
    private String email;
    private String password;
}
