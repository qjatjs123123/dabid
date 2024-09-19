package com.ssafy.dabid.domain.deal.repository;

import com.ssafy.dabid.domain.deal.entity.Deal;
import com.ssafy.dabid.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DealRepository extends JpaRepository<Deal, String>{
    Deal findById(int id);
    List<Deal> findAllBySellerOrBuyer(Member Seller, Member Buyer);

}

