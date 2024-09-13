package com.ssafy.dabid.domain.inquiry.service;

import com.ssafy.dabid.domain.inquiry.dto.InquiryRequestDto;
import com.ssafy.dabid.domain.inquiry.entity.Inquiry;
import com.ssafy.dabid.domain.inquiry.repository.InquiryRepository;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import com.ssafy.dabid.global.status.CommonResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InquiryServiceImpl implements InquiryService {

    private final InquiryRepository inquiryRepository;
    private final MemberRepository memberRepository;

    @Override
    public CommonResponseDto createInquiry(InquiryRequestDto dto) {
        Member member = memberRepository.findById(dto.getMemberId()).orElse(null);
        if(member == null) {
            return CommonResponseDto.fail();
        }

        Inquiry inquiry = Inquiry.createInquiry(dto, member);
        inquiryRepository.save(inquiry);
        return new CommonResponseDto();
    }
}
