package com.ssafy.dabid.domain.inquiry.repository;

import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.inquiry.entity.Inquiry;
import com.ssafy.dabid.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InquiryRepository extends JpaRepository<Inquiry, Integer> {
    @Query("select i from Inquiry i where i.isActive = true")
    List<Inquiry> findAll();

//    @Query("select i from Inquiry i where i.id = :id and i.isActive = true")
//    Optional<Inquiry> findById(int id);

    @Query("select i from Inquiry i where i.member = :member and i.isActive = true")
    List<Inquiry> findByMember(Member member);
}
