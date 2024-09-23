package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.domain.member.dto.PointDto;
import com.ssafy.dabid.domain.member.dto.request.SignUpRequestDto;
import com.ssafy.dabid.domain.member.dto.response.RandomNicknameResponseDto;
import com.ssafy.dabid.domain.member.entity.Account;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberAccountRepository;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import com.ssafy.dabid.global.api.ssafy.SsafyApiClient;
import com.ssafy.dabid.global.api.ssafy.response.AccountBalanceResponse;
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

    @Autowired
    MemberAccountRepository memberAccountRepository;
    @Autowired
    private SsafyApiClient ssafyApiClient;

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

    @Test
    void 회원가입시계좌생성(){
        RandomNicknameResponseDto randomNicknameResponseDto = (RandomNicknameResponseDto) memberService.generateNickname();

        SignUpRequestDto dto = new SignUpRequestDto();
        dto.setEmail("email123@gmail.com");
        dto.setPassword("password");
        dto.setNickname(randomNicknameResponseDto.getNickname());
        memberService.signUp(dto);

        Member member = memberRepository.findByEmail(dto.getEmail()).orElse(null);
        assertNotNull(member);
        String userKey = member.getUserKey();
        assertNotNull(userKey);

        Account account = memberAccountRepository.findByMember(member);
        assertNotNull(account);

        String accountNo = account.getAccount_number();
        AccountBalanceResponse accountBalanceResponse = ssafyApiClient.accountBalance(userKey, accountNo);

        assertEquals(1000000, accountBalanceResponse.getRec().getAccountBalance());
    }

//    @Test
//    void 포인트충전() {
//        PointDto dto = new PointDto();
//        dto.setAccount("0018520954400580");
//        dto.setAmount("1000");
//
//    }
}