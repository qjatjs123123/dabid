package com.ssafy.dabid.domain.auction.entity;

import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.global.config.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 기본키를 Primitive Type으로 하는 이유:
 * 각 요청에서 모든 변수를 Wrapper Class로 생성 시 객체 생성에 많은 메모리 소모를 우려함.
 * 때문에 JPA를 사용할 때 한번만 Primitive -> Wrapper를 유도함으로서 메모리를 효율적으로
 * 사용하는 것을 유도.
 */
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
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

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
    private int firstBid;

    @Column
    private int secondBid;

    @Column
    private LocalDateTime finishedAt;

}
