package com.ssafy.dabid.domain.auction.repository;

import com.ssafy.dabid.domain.auction.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuctionJpaRepository extends JpaRepository<Auction, Integer> {
    @Query("select a from Auction a where a.isActive = true")
    List<Auction> findAllAuctions();

    @Query("select a from Auction a where a.id = :id and a.isActive = true")
    Optional<Auction> findById(int id);

    List<Auction> findAllByOrderByCreatedAtDesc();
    List<Auction> findByTitleContainingOrderByCreatedAtDesc(String title);
}
