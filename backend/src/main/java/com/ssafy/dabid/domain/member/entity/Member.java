package com.ssafy.dabid.domain.member.entity;

import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.global.config.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

/**
 * Member 더미데이터입니당
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "member")
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private int point;

    public void increasePoint(int value){
        this.point += value;
    }

    public void decreasePoint(int value){
        this.point -= value;
    }
}
