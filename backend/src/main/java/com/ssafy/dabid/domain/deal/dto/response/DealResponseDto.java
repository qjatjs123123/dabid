package com.ssafy.dabid.domain.deal.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@ToString
public class DealResponseDto {
    private int id;
    private String seller_nickname;
    private String title;
    private String detail;
    private String image;
    private String status;
    private boolean isTimerVisible;
    private String account;
    private String carrierId;
    private String trackingNumber;
    private LocalDateTime created_at;
    private int winning_bid;
    private boolean isSeller;
}
