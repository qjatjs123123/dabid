package com.ssafy.dabid.domain.member.controller;

import com.ssafy.dabid.domain.member.dto.request.SignInRequestDto;
import com.ssafy.dabid.domain.member.dto.request.SignUpRequestDto;
import com.ssafy.dabid.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/sign-up")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDto dto) {
        return ResponseEntity.ok(memberService.signUp(dto));
    }

    @PostMapping("/sign-in")
    public ResponseEntity<?> signIn(@RequestBody SignInRequestDto dto){
        //두 토큰을 헤더에 담아서 반환
        return ResponseEntity.ok(memberService.signIn(dto));
    }

    @PostMapping("/sign-out")
    public ResponseEntity<?> signOut(@RequestBody String email){
        //리프레시 토큰을 삭제
        memberService.signOut(email);
        return ResponseEntity.ok().build();
    }

/*
    @GetMapping("/random-nickname")
    public ResponseEntity<?> randomNickname(){
        //흠
    }

    @PostMapping("/check")
    public ResponseEntity<?> checkDuplicate(@RequestBody Dto dto){

    }*/
}
