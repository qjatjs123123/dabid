package com.ssafy.dabid.domain.auction.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 해당 DTO는 Auction Entity에 대한 DTO로서 title, name,
 * category, detail, deposit, isFirstMember를 나타낸다.
 * secondBid는 WebSocket을 통해 구현될 것으로 예상하여 포함되지 않는다.
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuctionDto {
    private boolean isFirstMember;
    private boolean isOwner;
    private boolean isParticipant;
    private int deposit;
    private int person;
    private int bid;
    private String title;
    private String category;
    private String detail;

    private String profileImage;
    private String nickname;

    private LocalDateTime finishedAt;
    private List<String> images;
}
