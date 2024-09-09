package com.ssafy.dabid.domain.auction.service;

import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.auction.entity.AuctionInfo;
import com.ssafy.dabid.domain.auction.repository.AuctionInfoRepository;
import com.ssafy.dabid.domain.auction.repository.AuctionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BiddingServiceImpl implements BiddingService {

//    private final MemberRepository memberRepository;
    private final AuctionRepository auctionRepository;
    private final AuctionInfoRepository auctionInfoRepository;

    // 경매 참여
    @Override
    public void joinBidding(int auctionId) {
        /* 1. 요청한 사용자(member)와 참여 요청 경매(auction) 정보를 DB에서 가져온다. */
        //int memberId = SecurityUtil.getLoginUsername();
        //Member member = memberRepository.findById(memberId).orElse(null);
        Auction auction = auctionRepository.findById(auctionId).orElse(null);

        /* 2. 경매 참여 정보를 DB(auction_Info)에 저장하기 위한 정보를 세팅한다. */
        AuctionInfo auctionInfo = new AuctionInfo();
        auctionInfo.setBid(0);
        auctionInfo.setAuction(auction);
        //auctionInfo.setMember(member);

        /* 3. 사용자(member)가 경매 입장비를 지불할 수 있는지 확인하고 포인트를 차감한다. */
        //int point = member.getPoint() - auction.getDeposit();
        //if(point < 0) {
        //    throw new BadRequestException("포인트가 부족합니다.");
        //}
        //member.setPoint(point);
        //memberRepository.save(member);

        /* 4. 경매 참여 정보를 DB(auction_Info)에 저장한다. */
        auctionInfoRepository.save(auctionInfo);
    }

    // 경매 참여 포기
    @Override
    public void giveUpBidding(int auctionId) {
        /* 1. 요청한 사용자(member)와 참여 포기 요청 경매(auction) 정보를 DB에서 가져온다. */
        //int memberId = SecurityUtil.getLoginUsername();
        //Member member = memberRepository.findById(memberId).orElse(null);
        
        /* 2. 사용자가 경매에 참여 중인지 여부를 DB(auction_info)에서 확인한다. */
        AuctionInfo auctionInfo = auctionInfoRepository.findByAuction_Id(auctionId).orElse(null);
        //if(auctionInfo.getMember.getId.equals(memberId)) {
        //    throw new BadRequestException("해당 경매에 참여한 상태가 아닙니다.");
        //}

        /* 3. 사용자의 경매 참여 정보를 DB(auction_Info)서 삭제한다. */
        auctionInfoRepository.delete(auctionInfo);

    }

    // 입찰하기
    @Override
    public void bid(int auctionId, int bid) {
        /* 1. 요청한 사용자(member) 정보를 경매 참여자 정보 DB(auction_info)에서 가져온다. */
        //int memberId = SecurityUtil.getLoginUsername();
        //AuctionInfo auctionInfo = auctionInfoRepository.findByMember_Id(memberId);

        /* 2. 사용자가 경매에 참여 중인지 여부를 DB(auction_info)에서 확인한다. */
        AuctionInfo auctionInfo = auctionInfoRepository.findByAuction_Id(auctionId).orElse(null);
        //if(auctionInfo.getMember.getId.equals(memberId)) {
        //    throw new BadRequestException("해당 경매에 참여한 상태가 아닙니다.");
        //}

    }
}
