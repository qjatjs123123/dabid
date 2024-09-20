package com.ssafy.dabid.domain.member.repository;

import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberAccountRepository extends JpaRepository<Account, Integer> {
    @Query("select ma from Account ma " +
            "where ma.member.id = :memberId")
    Account findByMemberId(int memberId);
}
