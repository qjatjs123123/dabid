package com.ssafy.dabid.domain.inquiry.service;

import com.ssafy.dabid.domain.auction.entity.AuctionImage;
import com.ssafy.dabid.domain.inquiry.dto.InquiryRequestDto;
import com.ssafy.dabid.domain.inquiry.entity.Category;
import com.ssafy.dabid.domain.inquiry.entity.Inquiry;
import com.ssafy.dabid.domain.inquiry.entity.InquiryImage;
import com.ssafy.dabid.domain.inquiry.repository.InquiryImageRepository;
import com.ssafy.dabid.domain.inquiry.repository.InquiryRepository;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import com.ssafy.dabid.global.status.CommonResponseDto;
import com.ssafy.dabid.global.utils.S3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class InquiryServiceImpl implements InquiryService {

    private final InquiryRepository inquiryRepository;
    private final MemberRepository memberRepository;
    private final InquiryImageRepository inquiryImageRepository;
    private final S3Util s3Util;

    @Override
    public CommonResponseDto createInquiry(InquiryRequestDto dto) {
        Member member = memberRepository.findById(dto.getMemberId()).orElse(null);
        if(member == null) {
            return CommonResponseDto.fail();
        }

        Inquiry inquiry = Inquiry.createInquiry(dto, member);

        inquiry = inquiryRepository.save(inquiry);

        List<String> imageList = s3Util.uploadFiles(dto.getImages());

        for(String image : imageList) {
            inquiryImageRepository.save(InquiryImage.builder()
                    .inquiry(inquiry)
                    .imageUrl(image)
                    .build()
            );
        }

        return new CommonResponseDto();
    }
}
