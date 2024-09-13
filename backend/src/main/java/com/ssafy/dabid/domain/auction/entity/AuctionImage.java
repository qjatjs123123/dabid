package com.ssafy.dabid.domain.auction.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "AUCTION_IMAGE")
public class AuctionImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "AUCTION_ID")
    private Auction auction;
}
