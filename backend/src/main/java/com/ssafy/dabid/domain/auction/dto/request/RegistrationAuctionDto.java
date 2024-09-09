package com.ssafy.dabid.domain.auction.dto.request;

import lombok.*;

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
    private List<String> images;
    private List<String> hashTags;
    private String duration;
    private String detail;
    private int deposit;
    private int initValue;
}
