<<<<<<< HEAD
package com.ssafy.dabid.domain.member.entity;

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
    private Member member;


    
    @Column
    private String account_number;

}
=======
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
>>>>>>> 6dfb07e22d331e686c7a35fda1123b2b80f551e6
