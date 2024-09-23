package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.domain.member.dto.request.SignUpRequestDto;
import com.ssafy.dabid.domain.member.dto.response.RandomNicknameResponseDto;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import com.ssafy.dabid.global.status.CommonResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class MemberServiceImplTest {
    @Autowired
    MemberServiceImpl memberService;

    @Autowired
    MemberRepository memberRepository;

    @Test
    void 회원가입시유저키발급(){
        RandomNicknameResponseDto randomNicknameResponseDto = (RandomNicknameResponseDto) memberService.generateNickname();

        SignUpRequestDto dto = new SignUpRequestDto();
        dto.setEmail("xoxoxoxo@gmail.com");
        dto.setPassword("password");
        dto.setNickname(randomNicknameResponseDto.getNickname());
        memberService.signUp(dto);

        Member member = memberRepository.findByEmail(dto.getEmail()).orElse(null);
        assertNotNull(member);
        String userKey = member.getUserKey();
        assertNotNull(userKey);
        System.out.println("userKey = " + userKey);
    }
}