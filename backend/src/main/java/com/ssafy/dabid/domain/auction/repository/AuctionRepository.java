package com.ssafy.dabid.domain.auction.repository;

import com.ssafy.dabid.domain.auction.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuctionRepository extends JpaRepository<Auction, Integer> {
    Optional<Auction> findById(int id);
}
