package com.ssafy.dabid.domain.member.repository;

import com.ssafy.dabid.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    @Query("select m.point from Member m where m.id = :id")
    Integer findPointById(int id);
}
