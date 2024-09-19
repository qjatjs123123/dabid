package com.ssafy.dabid.domain.auction.repository;

import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.auction.entity.Auction_Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuctionImageRepository extends JpaRepository<Auction_Image, Integer> {
    Auction_Image findFirstByAuctionOrderByIdAsc(Auction auction);
}
