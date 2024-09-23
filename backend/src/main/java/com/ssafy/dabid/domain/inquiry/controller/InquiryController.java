package com.ssafy.dabid.domain.inquiry.controller;

import com.ssafy.dabid.domain.inquiry.dto.InquiryRequestDto;
import com.ssafy.dabid.domain.inquiry.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/inquiry")
@RequiredArgsConstructor
public class InquiryController {

    private final InquiryService inquiryService;

    @PostMapping("/")
    public ResponseEntity<?> create(@ModelAttribute InquiryRequestDto dto) {

        return ResponseEntity.ok(inquiryService.createInquiry(dto));
    }

    @GetMapping("/my-list")
    public ResponseEntity<?> myList() {
        return ResponseEntity.ok(inquiryService.getMyInquiry());
    }

    @GetMapping("/file")
    public ResponseEntity<?> file() throws IOException {
        return ResponseEntity.ok(inquiryService.writeCsv());
    }
}
