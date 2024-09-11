package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.domain.member.dto.request.SignInRequestDto;
import com.ssafy.dabid.domain.member.dto.request.SignUpRequestDto;
import com.ssafy.dabid.domain.member.dto.response.AuthResponseDto;

public interface MemberService {
    AuthResponseDto signUp(SignUpRequestDto dto);

    AuthResponseDto signIn(SignInRequestDto dto);

    void signOut(String email);
}
