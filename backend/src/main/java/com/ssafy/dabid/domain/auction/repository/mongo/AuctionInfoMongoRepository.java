package com.ssafy.dabid.domain.auction.repository.mongo;

import com.ssafy.dabid.domain.auction.entity.mongo.AuctionInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuctionInfoMongoRepository extends MongoRepository<AuctionInfo, Integer> {
    @Query(value = "{auctionId:?0, memberId:?1}")
    Optional<AuctionInfo> findByAuctionIdAndMemberId(int auctionId, int memberId);

    @Query(value="{auctionId:?0}", count = true)
    Integer countByAuctionId(int auctionId);
}
