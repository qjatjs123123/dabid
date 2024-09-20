package com.ssafy.dabid.domain.member.controller;

import com.ssafy.dabid.domain.member.dto.request.CheckRequestDto;
import com.ssafy.dabid.domain.member.dto.request.RefreshRequestDto;
import com.ssafy.dabid.domain.member.dto.request.SignInRequestDto;
import com.ssafy.dabid.domain.member.dto.request.SignUpRequestDto;
import com.ssafy.dabid.domain.member.service.MemberService;
import com.ssafy.dabid.domain.member.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/auth/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto dto) {
        log.info("Sign Up for user with email : " + dto.getEmail());
        return ResponseEntity.ok(memberService.signUp(dto));
    }

    @PostMapping("/auth/sign-in")
    public ResponseEntity<?> signIn(@RequestBody SignInRequestDto dto){
        log.info("Sign In for user with email : " + dto.getEmail());

        //두 토큰을 헤더에 담아서 반환
        return ResponseEntity.ok(memberService.signIn(dto));
    }

    @PostMapping("/auth/sign-out")
    public ResponseEntity signOut(@RequestBody Map<String, String> map){
        String email = map.get("email");
        log.info("Sign Out for user with email : " + email);

        //리프레시 토큰을 삭제
        return ResponseEntity.ok(memberService.signOut(email));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<?> refresh(@RequestBody RefreshRequestDto dto){
        log.info("Refresh accessToken with refreshToken : " + dto.getRefreshToken());

        return ResponseEntity.ok(memberService.refresh(dto));
    }

    @GetMapping("/auth/random-nickname")
    public ResponseEntity<?> randomNickname(){
        return ResponseEntity.ok(memberService.generateNickname());
    }

    @PostMapping("/auth/check")
    public ResponseEntity<?> checkDuplicate(@RequestBody CheckRequestDto dto){
        return ResponseEntity.ok(memberService.checkDuplicate(dto));
    }
}
