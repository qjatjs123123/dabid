package com.ssafy.dabid.domain.auction.repository;

import com.ssafy.dabid.domain.auction.entity.AuctionDocument;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface AuctionElasticSearchRepository extends ElasticsearchRepository<AuctionDocument, String> {
    List<AuctionDocument> findAllByOrderByCreatedAtDesc();

    @Query("{\"wildcard\": {\"title\": \"*?0*\"}}, \"sort\": [{\"createdAt\": {\"order\": \"desc\"}}]")
    List<AuctionDocument> findByTitleContainingOrderByCreatedAtDesc(String title);
}
