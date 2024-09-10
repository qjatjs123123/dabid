package com.ssafy.dabid.domain.auction.entity;

import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.global.config.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "AUCTION_INFO")
public class AuctionInfo extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private int bid;

    @ManyToOne
    @JoinColumn(name = "AUCTION_ID")
    private Auction auction;

    // Member Entity 구현 시 적용
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
