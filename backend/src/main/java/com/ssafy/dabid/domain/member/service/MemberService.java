package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.domain.member.dto.PointDto;
import com.ssafy.dabid.domain.member.dto.request.*;
import com.ssafy.dabid.global.status.CommonResponseDto;

public interface MemberService {
    CommonResponseDto signUp(SignUpRequestDto dto);

    CommonResponseDto signIn(SignInRequestDto dto);

    CommonResponseDto signOut(String email);

    CommonResponseDto refresh(RefreshRequestDto dto);

    CommonResponseDto checkDuplicate(CheckRequestDto dto);

    CommonResponseDto generateNickname();

    CommonResponseDto pointIn(PointDto dto);

    CommonResponseDto pointOut(PointDto dto);

    CommonResponseDto transaction();

    CommonResponseDto balance();

    CommonResponseDto requestAccountAuth();

    CommonResponseDto checkAccountAuth(AuthCheckRequestDto dto);

    CommonResponseDto requestPhoneAuth(PhoneAuthRequestDto dto);

    CommonResponseDto checkPhoneAuth(CheckPhoneAuthRequestDto dto);

    CommonResponseDto getUserInfo();

    void checkEmailNonNative();
    void checkEmailNative();
}
