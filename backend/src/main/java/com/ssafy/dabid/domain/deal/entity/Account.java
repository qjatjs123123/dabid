package com.ssafy.dabid.domain.deal.entity;

import com.ssafy.dabid.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "member_account")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    Member member;

    @Column
    private String account_number;

    @Column
    private String created_at;

    @Column
    private String modified_at;

    @Column
    private String is_active;
}
