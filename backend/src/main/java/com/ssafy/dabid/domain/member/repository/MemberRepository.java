package com.ssafy.dabid.domain.member.repository;

import com.ssafy.dabid.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {

    Optional<Member> findByEmail(String email);
    Optional<Member> findById(int id);
}
