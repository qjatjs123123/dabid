package com.ssafy.dabid.domain.auction.dto.response;

import lombok.*;

import java.time.LocalDateTime;

/**
 * 해당 DTO는 Auction을 전체 조회할 API에서 사용되는 DTO로서
 * auctionId, title, image, category, person을 나타낸다.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
//public class AuctionListDto {
//    private int auctionId;
//    private String title;
//    private String thumbnail;
//    private String category;
//}
public class AuctionListDto {
    private String auctionId;
    private String title;
    private String thumbnail;
    private String secondBid;
    private int person;
    private LocalDateTime finishedAt;
    private LocalDateTime createdAt;
}
