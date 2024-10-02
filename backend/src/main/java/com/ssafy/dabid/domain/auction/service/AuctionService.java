package com.ssafy.dabid.domain.auction.service;

import com.ssafy.dabid.domain.auction.dto.request.RegistrationAuctionDto;
import com.ssafy.dabid.domain.auction.dto.request.SearchAuctionTitle;
import com.ssafy.dabid.domain.auction.dto.response.AuctionDto;
import com.ssafy.dabid.domain.auction.dto.response.AuctionListDto;
import org.quartz.SchedulerException;

import java.util.List;

public interface AuctionService {
    List<AuctionListDto> getAuctions();
    List<AuctionListDto> getAuctionsTitle(SearchAuctionTitle searchAuctionTitle);
    List<AuctionListDto> getAuctionsTitleTest(SearchAuctionTitle searchAuctionTitle);

    AuctionDto getAuction(int auctionId) throws SchedulerException;
    void registPost(RegistrationAuctionDto dto) throws SchedulerException;
    void inActivatePost(int auctionId) throws SchedulerException;

    boolean isExistParticipant(int auctionId);

    void returnBuyerPointWhenGiveUp(int auctionId, int buyerDeposit);

    void returnBuyerPointWhenExpired(int auctionId, int firstMemberId, int buyerDeposit);

    void returnSellerPoint(int auctionId);
}