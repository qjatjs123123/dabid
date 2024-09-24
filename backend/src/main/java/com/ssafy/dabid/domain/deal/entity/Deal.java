package com.ssafy.dabid.domain.deal.entity;

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
@Table(name = "deal")
public class Deal extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member seller;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member buyer;

    @Column
    private String title;

    @Column
    private String image;

    @Column
    private int winning_bid;

    @Column
    private int deposit;

    @Column
    @Enumerated(EnumType.STRING)
    private Status status = Status.BID_SUCCESS;

    @Column
    @Enumerated(EnumType.STRING)
    private CarrierId carrier_id;

    @Column
    private String trackingNumber;

    @Column
    private String detail;

    @Column
    private String account;
}

