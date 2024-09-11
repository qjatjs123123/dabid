package com.ssafy.dabid.domain.member.repository;

import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.entity.MemberAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberAccountRepository extends JpaRepository<MemberAccount, Integer> {
    @Query("select ma from MemberAccount ma " +
            "where ma.member.id = :memberId")
    MemberAccount findByMemberId(int memberId);
}
