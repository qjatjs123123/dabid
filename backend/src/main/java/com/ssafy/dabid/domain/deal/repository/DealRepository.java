package com.ssafy.dabid.domain.deal.repository;

import com.ssafy.dabid.domain.deal.entity.Deal;
import com.ssafy.dabid.domain.deal.entity.Status;
import com.ssafy.dabid.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface DealRepository extends JpaRepository<Deal, Integer>{
    Optional<Deal> findById(int id);
    List<Deal> findAllBySellerOrBuyer(Member Seller, Member Buyer);
    Page<Deal> findAllBySellerOrBuyerOrderByCreatedAtDesc(Member seller, Member buyer, Pageable pageable);
    long countBySellerOrBuyer(Member Seller, Member Buyer);
}

