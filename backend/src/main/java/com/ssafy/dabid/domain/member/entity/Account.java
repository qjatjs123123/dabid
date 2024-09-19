//package com.ssafy.dabid.domain.member.entity;
//
//import jakarta.persistence.*;
//import lombok.*;
//
//@Entity
//@NoArgsConstructor
//@AllArgsConstructor
//@Getter
//@Setter
//@Builder
//@Table(name = "member_account")
//public class Account {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//
//    @OneToOne(fetch = FetchType.LAZY)
//    private Member member;
//
//    @Column
//    private String account_number;
//
//}