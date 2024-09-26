package com.ssafy.dabid.domain.auction.entity.mongo;

import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Document(collection = "auctioninfo")
public class AuctionInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private int bid;

    private int auctionId;

    private int memberId;
}
