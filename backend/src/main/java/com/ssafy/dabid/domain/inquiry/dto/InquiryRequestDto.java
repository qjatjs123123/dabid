package com.ssafy.dabid.domain.inquiry.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InquiryRequestDto {

    private String title;

    private String content;

    private String category;

    private List<MultipartFile> images;

}
