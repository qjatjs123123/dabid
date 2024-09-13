package com.ssafy.dabid.domain.auction.repository;

import com.ssafy.dabid.domain.auction.entity.AuctionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuctionInfoRepository extends JpaRepository<AuctionInfo, Integer> {

    Optional<AuctionInfo> findByAuction_IdAndMember_Id(int auctionId, int memberId);

    @Query("select count(ai) from AuctionInfo ai " +
            "inner join Auction a on a.id = ai.auction.id " +
            "where a.id = :auctionId")
    Integer countByAuctionId(int auctionId);
}
