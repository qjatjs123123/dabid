package com.ssafy.dabid.domain.auction.service;

import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.auction.entity.AuctionInfo;
import com.ssafy.dabid.domain.auction.repository.AuctionInfoRepository;
import com.ssafy.dabid.domain.auction.repository.AuctionJpaRepository;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberAccountRepository;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BiddingServiceImpl implements BiddingService {
    private final MemberRepository memberRepository;
    private final AuctionJpaRepository auctionJpaRepository;
    private final AuctionInfoRepository auctionInfoRepository;
    private final MemberAccountRepository memberAccountRepository;

    // 경매 참여
    @Override
    public void joinBidding(int auctionId) {
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않는 경매입니다."));

        /* 1. 요청한 사용자(member)와 참여 요청 경매(auction) 정보를 DB에서 가져온다. */
        int memberId = 1;//SecurityUtil.getLoginUsername();
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NullPointerException("존재하지 않는 회원입니다."));

        /* 계좌 인증 확인 */
        if(!memberAccountRepository.findByMemberId(memberId).getIsActive())
            throw new IllegalStateException("계좌가 인증되지 않았습니다.");

        /* 포인트 확인 */
        if(member.getPoint() < auction.getDeposit())
            throw new IllegalStateException("포인트가 충분하지 않습니다.");
        member.decreasePoint(auction.getDeposit());

        /* 2. 경매 참여 정보를 DB(auction_Info)에 저장하기 위한 정보를 세팅한다. */
        AuctionInfo auctionInfo = AuctionInfo.builder()
                .auction(auction)
                .bid(0)
                .member(member)
                .build();

        /* 3. 사용자(member)가 경매 입장비를 지불할 수 있는지 확인하고 포인트를 차감한다. */
        memberRepository.save(member);

        /* 4. 경매 참여 정보를 DB(auction_Info)에 저장한다. */
        auctionInfoRepository.save(auctionInfo);
    }

    // 경매 참여 포기
    @Override
    public void giveUpBidding(int auctionId) {
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않는 경매입니다."));

        /* 1. 요청한 사용자(member)와 참여 포기 요청 경매(auction) 정보를 DB에서 가져온다. */
        int memberId = 1; //SecurityUtil.getLoginUsername();
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NullPointerException("존재하지 않는 회원입니다."));
        
        /* 2. 사용자가 경매에 참여 중인지 여부를 DB(auction_info)에서 확인한다. */
        if(auction.getFirstMemberId() == memberId) {
            throw new IllegalArgumentException("1등 상태에서 참여 포기가 불가능합니다.");
        }
        AuctionInfo auctionInfo = auctionInfoRepository.findByAuction_IdAndMember_Id(auctionId, memberId).orElseThrow(() -> new NullPointerException("존재하지 않는 AuctionInfo 입니다."));

        /* 3. 사용자의 경매 참여 정보를 DB(auction_Info)서 삭제한다. */
        member.increasePoint(auctionInfo.getAuction().getDeposit());
        memberRepository.save(member);
        auctionInfoRepository.delete(auctionInfo); //NoSQL 변경예정
    }

    // 입찰하기
    @Override
    public int bid(int auctionId, int bid) {
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않는 경매입니다."));
        
        /* 1. 요청한 사용자(member) 정보를 경매 참여자 정보 DB(auction_info)에서 가져온다. */
        int memberId = 1;//SecurityUtil.getLoginUsername();
        AuctionInfo auctionInfo = auctionInfoRepository.findByAuction_IdAndMember_Id(auctionId, memberId).orElseThrow(() -> new NullPointerException("존재하지 않는 AuctionInfo 입니다."));

        /* 2. 사용자가 경매에 참여 중인지 여부를 DB(auction_info)에서 확인한다. */
        auctionInfo.setBid(bid);

        /* 3. 사용자가 2nd price auction 경매 방식에서 입찰에 성공했는지 여부를 판단한다.  */
        if (auction.getFirstBid() <= bid) { // 1등 입찰가보다 적거나 같은 금액 입찰 시도
            if (auction.getSecondBid() > bid) { // 2등 입찰가보다 높은 금액이면 표시 2등 입찰가 수정
                auction.setSecondBid(bid);
            }
            auctionJpaRepository.save(auction);
            return 0; // 유력 낙찰자 탈환 실패
        } else { // 1등 입찰가보다 높은 금액 입찰 시도
            auction.setSecondBid(auction.getFirstBid());
            /*
            로직 - 기존 auction.getFirstMemberId()의 사용자에게 낙찰 유력 뺐김을 CoolSMS 알림
            */
            auction.setFirstMemberId(memberId);
            auction.setFirstBid(bid);
            auctionJpaRepository.save(auction);
            return 1; // 유력 낙찰자 탈환 성공
        }
    }
}
