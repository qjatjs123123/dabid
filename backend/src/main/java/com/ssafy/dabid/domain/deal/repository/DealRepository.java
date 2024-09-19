package com.ssafy.dabid.domain.deal.repository;

import com.ssafy.dabid.domain.deal.entity.Deal;
import com.ssafy.dabid.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DealRepository extends JpaRepository<Deal, Integer> {
    List<Deal> findAllBySellerOrBuyer(Member Seller, Member Buyer);
}
