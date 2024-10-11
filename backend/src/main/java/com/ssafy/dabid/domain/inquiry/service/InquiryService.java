package com.ssafy.dabid.domain.inquiry.service;

import com.ssafy.dabid.domain.inquiry.dto.InquiryRequestDto;
import com.ssafy.dabid.global.status.CommonResponseDto;
import org.apache.poi.ss.usermodel.Workbook;

import java.io.IOException;

public interface InquiryService {
    CommonResponseDto createInquiry(InquiryRequestDto dto);
    CommonResponseDto getMyInquiry();
    String writeCsv() throws IOException;
    Workbook createExcelFile();
}
