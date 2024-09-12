package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.domain.member.dto.request.SignInRequestDto;
import com.ssafy.dabid.domain.member.dto.request.SignUpRequestDto;
import com.ssafy.dabid.domain.member.dto.response.AuthResponseDto;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.entity.Role;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import com.ssafy.dabid.global.utils.JwtUtils;
import com.ssafy.dabid.global.utils.TokenType;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;

    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public AuthResponseDto signUp(SignUpRequestDto dto) {
        Member member = Member
                .builder()
                .email(dto.getEmail())
                .role(Role.USER)
                .password(passwordEncoder.encode(dto.getPassword()))
                .nickname(dto.getNickname())
                .phoneNumber(dto.getPhoneNumber())
                .build();

        //TODO : 금융망 API를 통해 userKey 등록

        String access = jwtUtils.createToken(dto.getEmail(), TokenType.ACCESS);
        String refresh = jwtUtils.createToken(null, TokenType.REFRESH);
        member.updateRefreshToken(refresh);

        memberRepository.save(member);

        return new AuthResponseDto(access, refresh);
    }

    @Override
    @Transactional
    public AuthResponseDto signIn(SignInRequestDto dto) {
        Member member = memberRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (passwordEncoder.matches(dto.getPassword(), member.getPassword())){
            String access = jwtUtils.createToken(member.getEmail(), TokenType.ACCESS);
            String refresh = jwtUtils.createToken(null, TokenType.REFRESH);
            member.updateRefreshToken(refresh);

            memberRepository.save(member);

            return new AuthResponseDto(access, refresh);
        }
        return null;
    }

    @Override
    @Transactional
    public void signOut(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        member.updateRefreshToken(null);
        memberRepository.save(member);
    }
}
