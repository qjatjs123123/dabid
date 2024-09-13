package com.ssafy.dabid.domain.inquiry.service;

import com.ssafy.dabid.domain.inquiry.dto.InquiryRequestDto;
import com.ssafy.dabid.global.status.CommonResponseDto;

public interface InquiryService {
    CommonResponseDto createInquiry(InquiryRequestDto dto);
}
