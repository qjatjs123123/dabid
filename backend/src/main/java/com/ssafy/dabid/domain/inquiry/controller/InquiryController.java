package com.ssafy.dabid.domain.inquiry.controller;

import com.ssafy.dabid.domain.inquiry.dto.InquiryRequestDto;
import com.ssafy.dabid.domain.inquiry.service.InquiryService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.extractor.ExcelExtractor;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.OutputStream;

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

    @GetMapping("/excel")
    public ResponseEntity<?> downloadExcelFile(HttpServletResponse response) throws IOException {
        try (Workbook wb = inquiryService.createExcelFile()) {
            String fileName = "inquiry.xlsx";

            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName + "\"");

            try (OutputStream outputStream = response.getOutputStream()) {
                wb.write(outputStream);
            }
        }

        return ResponseEntity.ok().build();
    }
}
