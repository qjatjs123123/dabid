package com.ssafy.dabid.domain.auction.dto.response;

import lombok.*;

/**
 * 해당 DTO는 Auction을 전체 조회할 API에서 사용되는 DTO로서
 * auctionId, title, image, category, person을 나타낸다.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuctionListDto {
    private int auctionId;
    private String title;
    private String image;
    private String category;
}
