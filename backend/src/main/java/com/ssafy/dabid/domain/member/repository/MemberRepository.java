package com.ssafy.dabid.domain.member.repository;

import com.ssafy.dabid.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByEmail(String email);

    @Query(value = "select * from member m where m.email = :email", nativeQuery = true)
    Optional<Member> findByEmailNative(String email);

    Optional<Member> findByPhoneNumber(String phoneNumber);
    Optional<Member> findById(int id);
    Optional<Member> findByNickname(String value);

    @Query("select m.point from Member m where m.id = :id")
    Integer findPointById(int id);
}
