package com.ssafy.dabid.domain.auction.repository;

import com.ssafy.dabid.domain.auction.entity.AuctionInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuctionInfoRepository extends JpaRepository<AuctionInfo, Integer> {

    Optional<AuctionInfo> findByAuction_Id(int auctionId);

    Optional<AuctionInfo> findByMember_Id(int memberId);
}
