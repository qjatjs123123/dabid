package com.ssafy.dabid.domain.auction.mapper;

import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.auction.entity.AuctionDocument;
import org.springframework.stereotype.Component;

@Component
public class AuctionMapper  {

    public AuctionDocument toDocument(Auction auction) {
        AuctionDocument doc = new AuctionDocument();
        doc.setId(String.valueOf(auction.getId()));
        doc.setTitle(auction.getTitle());
        doc.setThumbnail(auction.getThumbnail());
        doc.setSecondBid(String.valueOf(auction.getSecondBid()));
        doc.setFinishedAt(auction.getFinishedAt());
        doc.setCreatedAt(auction.getCreatedAt());
        return doc;
    }
}
