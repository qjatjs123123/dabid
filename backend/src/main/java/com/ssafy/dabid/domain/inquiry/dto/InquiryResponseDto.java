package com.ssafy.dabid.domain.inquiry.dto;


import com.ssafy.dabid.domain.inquiry.entity.InquiryImage;
import com.ssafy.dabid.global.status.CommonResponseDto;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InquiryResponseDto extends CommonResponseDto {
    private List<InquiryItem> list;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class InquiryItem {
        private Integer inquiryId;
        private String title;
        private String content;
        private String category;
        private List<String> imageUrls;
    }
}
