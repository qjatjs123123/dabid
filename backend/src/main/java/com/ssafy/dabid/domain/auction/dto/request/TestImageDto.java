package com.ssafy.dabid.domain.auction.dto.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestImageDto {
    List<MultipartFile> images;
}
