package com.ssafy.dabid.domain.member.service;

import com.ssafy.dabid.domain.member.dto.request.*;
import com.ssafy.dabid.domain.member.dto.response.RefreshResponseDto;
import com.ssafy.dabid.domain.member.dto.response.SignInResponseDto;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.entity.Role;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import com.ssafy.dabid.domain.member.repository.RandomNicknameMapper;
import com.ssafy.dabid.global.status.CommonResponseDto;
import com.ssafy.dabid.global.status.StatusCode;
import com.ssafy.dabid.global.status.StatusMessage;
import com.ssafy.dabid.global.utils.JwtUtils;
import com.ssafy.dabid.global.utils.TokenType;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.util.Pair;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final RandomNicknameMapper mapper;

    private final JwtUtils jwtUtils;
    private final PasswordEncoder passwordEncoder;

    private Map<ValueType, Function<String, Optional<?>>> checkFunctions;
    private Map<ValueType, Pair<String, String>> responseMappings;

    @PostConstruct
    void init(){
        checkFunctions = Map.of(
                ValueType.EMAIL, memberRepository::findByEmail,
                ValueType.PHONE, memberRepository::findByPhoneNumber,
                ValueType.NICKNAME, memberRepository::findByNickname
        );

        responseMappings = Map.of(
                ValueType.EMAIL, Pair.of(StatusCode.DUPLICATE_EMAIL, StatusMessage.DUPLICATE_EMAIL),
                ValueType.PHONE, Pair.of(StatusCode.DUPLICATE_PHONE_NUMBER, StatusMessage.DUPLICATE_PHONE_NUMBER),
                ValueType.NICKNAME, Pair.of(StatusCode.DUPLICATE_NICKNAME, StatusMessage.DUPLICATE_NICKNAME)
        );
    }

    @Override
    public CommonResponseDto signUp(SignUpRequestDto dto) {
        Member member = Member
                .builder()
                .email(dto.getEmail())
                .role(Role.USER)
                .password(passwordEncoder.encode(dto.getPassword()))
                .nickname(dto.getNickname())
                .phoneNumber(dto.getPhoneNumber())
                .build();

        //TODO : 금융망 API를 통해 userKey 등록

        memberRepository.save(member);

        return new CommonResponseDto();
    }

    /*private String genereateKey(String email){
        WebClient로 API를 호출
    }*/

    @Override
    public CommonResponseDto signIn(SignInRequestDto dto) {
        Member member = memberRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (passwordEncoder.matches(dto.getPassword(), member.getPassword())){
            String access = jwtUtils.createToken(member.getEmail(), TokenType.ACCESS);
            String refresh = jwtUtils.createToken(null, TokenType.REFRESH);
            member.updateRefreshToken(refresh);

            return new SignInResponseDto(access, refresh);
        }
        return null;
    }

    @Override
    public CommonResponseDto signOut(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        member.updateRefreshToken(null);

        return new CommonResponseDto();
    }

    @Override
    public CommonResponseDto refresh(RefreshRequestDto dto) {
        Member member = memberRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(dto.getRefreshToken().equals(member.getRefreshToken()))
            return new RefreshResponseDto(jwtUtils.createToken(dto.getEmail(), TokenType.ACCESS));

        return CommonResponseDto.fail();
    }

    @Override
    @Transactional(readOnly = true)
    public CommonResponseDto checkDuplicate(CheckRequestDto dto) {
        ValueType valueType = dto.getValueType();
        String value = dto.getValue();

        if (checkFunctions.containsKey(valueType)) {
            if (checkFunctions.get(valueType).apply(value).isPresent()) {
                Pair<String, String> status = responseMappings.get(valueType);
                return new CommonResponseDto(status.getFirst(), status.getSecond());
            }
            return new CommonResponseDto();
        }

        return CommonResponseDto.fail();
    }
}
