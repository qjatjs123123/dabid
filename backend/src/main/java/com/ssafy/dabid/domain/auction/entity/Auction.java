package com.ssafy.dabid.domain.auction.entity;

import com.ssafy.dabid.global.config.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "auction")
public class Auction extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String title;

    @Column
    private String name;

    @Column
    @Enumerated(EnumType.STRING)
    private Category category;

    @Column
    private String detail;

    @Column
    private int deposit;

    @Column
    private int firstMemberId;

    @Column
    private int secondBid;


}
