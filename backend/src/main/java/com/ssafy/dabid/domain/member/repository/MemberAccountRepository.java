package com.ssafy.dabid.domain.member.repository;

import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.entity.MemberAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberAccountRepository extends JpaRepository<MemberAccount, Integer> {
    @Query("select count(m) from Member m " +
            "inner join MemberAccount ma on m.id = ma.member.id ")
    Integer findByMemberId(int memberId);
}
