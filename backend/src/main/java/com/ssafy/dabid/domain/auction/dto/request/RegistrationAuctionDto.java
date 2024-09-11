package com.ssafy.dabid.domain.auction.dto.request;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 해당 DTO는 Auction을 등록할 때 사용하는 Request Dto로
 * title, name, category, images, hashTags, detail, deposit, initValue를 나타낸다.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationAuctionDto {
    private String title;
    private String name;
    private String category;
    private List<MultipartFile> images;
    private List<String> hashTags;
    private long duration;
    private String detail;
    private int initValue;
}
