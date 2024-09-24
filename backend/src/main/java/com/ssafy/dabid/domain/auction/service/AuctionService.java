package com.ssafy.dabid.domain.auction.service;

import com.ssafy.dabid.domain.auction.dto.request.RegistrationAuctionDto;
import com.ssafy.dabid.domain.auction.dto.response.AuctionDto;
import com.ssafy.dabid.domain.auction.dto.response.AuctionListDto;
import org.quartz.SchedulerException;

import java.util.List;

public interface AuctionService {
    List<AuctionListDto> getAuctions();
    AuctionDto getAuction(int auctionId) throws SchedulerException;
    void registPost(RegistrationAuctionDto dto) throws SchedulerException;
    void inActivatePost(int auctionId) throws SchedulerException;
}