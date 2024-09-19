package com.ssafy.dabid.domain.auction.entity;

import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.global.config.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Auction_Image extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Auction auction;

    private String image;
}
