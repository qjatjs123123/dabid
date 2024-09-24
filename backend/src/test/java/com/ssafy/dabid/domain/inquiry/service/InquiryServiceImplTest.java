package com.ssafy.dabid.domain.inquiry.service;

import com.ssafy.dabid.domain.inquiry.dto.InquiryRequestDto;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class InquiryServiceImplTest {
    @Autowired
    InquiryService inquiryService;

    @Autowired
    MemberRepository memberRepository;

    @Test
    void 문의() {
        // given
        Member member = new Member();
        memberRepository.save(member);

        InquiryRequestDto dto = new InquiryRequestDto();

        dto.setTitle("111");
        dto.setContent("222");
        dto.setCategory("DEAL");

        // when
        inquiryService.createInquiry(dto);

        // then

    }
}