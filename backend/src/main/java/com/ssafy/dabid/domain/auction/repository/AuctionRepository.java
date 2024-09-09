package com.ssafy.dabid.domain.auction.repository;

import com.ssafy.dabid.domain.auction.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Integer> {

    Optional<Auction> findById(int id);

}
