package com.ssafy.dabid.domain.auction.repository;

import com.ssafy.dabid.domain.auction.entity.AuctionImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionImageRepository extends JpaRepository<AuctionImage, Integer> {

    List<AuctionImage> findByAuction_Id(int auctionId);
}
