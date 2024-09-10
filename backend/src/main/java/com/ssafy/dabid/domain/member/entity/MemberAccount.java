package com.ssafy.dabid.domain.member.entity;

import jakarta.persistence.*;
import lombok.*;

/**
 * 더미데이터입니당
 */
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "member_account")
public class MemberAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    Member member;
}
