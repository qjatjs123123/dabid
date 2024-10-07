package com.ssafy.dabid.domain.auction.service;

import com.ssafy.dabid.domain.auction.entity.Auction;
//import com.ssafy.dabid.domain.auction.entity.AuctionInfo;
import com.ssafy.dabid.domain.auction.entity.mongo.AuctionInfo;
import com.ssafy.dabid.domain.auction.repository.AuctionInfoRepository;
import com.ssafy.dabid.domain.auction.repository.AuctionJpaRepository;
import com.ssafy.dabid.domain.auction.repository.mongo.AuctionInfoMongoRepository;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberAccountRepository;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BiddingServiceImpl implements BiddingService {
    private final MemberRepository memberRepository;
    private final AuctionJpaRepository auctionJpaRepository;
    private final AuctionInfoRepository auctionInfoRepository;
    private final MemberAccountRepository memberAccountRepository;
    private final AuctionInfoMongoRepository auctionInfoMongoRepository;

    // 경매 참여
    @Override
    public void joinBidding(int auctionId) {
        log.info("joinBidding 시작");

        log.info("참여 신청한 경매 조회");
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않는 경매입니다."));

        /* 1. 요청한 사용자(member)와 참여 요청 경매(auction) 정보를 DB에서 가져온다. */
        log.info("참여를 요청한 회원 조회");
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info(email);
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NullPointerException("존재하지 않는 회원입니다."));

        /* 계좌 인증 확인 */
        log.info("계좌 인증 여부 확인");
        if(!memberAccountRepository.findByMemberId(member.getId()).getIsActive())
            throw new IllegalStateException("계좌가 인증되지 않았습니다.");

        /* 참가 이력 확인 */
        log.info("이미 참가한 경매인지 확인");
        AuctionInfo info = auctionInfoMongoRepository.findByAuctionIdAndMemberId(auctionId, member.getId()).orElse(null);
        if(info != null){
            throw new IllegalStateException("이미 참가한 경매입니다.");
        }

        /* 포인트 확인 */
        log.info("포인트 확인");
        if(member.getPoint() < auction.getDeposit())
            throw new IllegalStateException("포인트가 충분하지 않습니다.");
        member.decreasePoint(auction.getDeposit());

        /* 2. 경매 참여 정보를 DB(auction_Info)에 저장하기 위한 정보를 세팅한다. */
        log.info("경매 참여 등록을 위한 데이터 생성");
        AuctionInfo auctionInfo = AuctionInfo.builder()
                .auctionId(auction.getId())
                .bid(0)
                .memberId(member.getId())
                .build();

        /* 3. 사용자(member)가 경매 입장비를 지불할 수 있는지 확인하고 포인트를 차감한다. */
        memberRepository.save(member);

        /* 4. 경매 참여 정보를 DB(auction_Info)에 저장한다. */
        auctionInfoMongoRepository.save(auctionInfo);

        log.info("joinBidding 종료");
    }

    // 경매 참여 포기
    @Override
    public void giveUpBidding(int auctionId) {
        log.info("giveUpBidding 시작");

        log.info("참여 포기 신청한 경매 조회");
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않는 경매입니다."));

        /* 1. 요청한 사용자(member)와 참여 포기 요청 경매(auction) 정보를 DB에서 가져온다. */
        log.info("경매 참여 포기 신청한 회원 조회");
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info(email);
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NullPointerException("존재하지 않는 회원입니다."));

        /* 2. 사용자가 경매에 참여 중인지 여부를 DB(auction_info)에서 확인한다. */
        log.info("경매 참여 포기 가능 여부 확인");
        if(auction.getFirstMemberId() == member.getId()) {
            throw new IllegalArgumentException("1등 상태에서 참여 포기가 불가능합니다.");
        }
        AuctionInfo auctionInfo = auctionInfoMongoRepository.findByAuctionIdAndMemberId(auctionId, member.getId()).orElseThrow(() -> new NullPointerException("존재하지 않는 AuctionInfo 입니다."));

        /* 3. 사용자의 경매 참여 정보를 DB(auction_Info)서 삭제한다. */
        log.info("경매 참여 기록 삭제 시작");
        member.increasePoint(auction.getDeposit());
        memberRepository.save(member);
        auctionInfoMongoRepository.delete(auctionInfo); //NoSQL 변경예정

        log.info("giveUpBidding 종료");
    }

    // 입찰하기
    @Override
    public int bid(int auctionId, int bid) {
        log.info("bid 시작");

        log.info("경매 입찰 신청한 경매 조회");
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않는 경매입니다."));
        
        /* 1. 요청한 사용자(member) 정보를 경매 참여자 정보 DB(auction_info)에서 가져온다. */
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info(email);
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new NullPointerException("존재하지 않는 회원입니다."));

        log.info("auctionInfo 찾기: " + "auctionId: " + auctionId + ", memberId: " + member.getId());
        AuctionInfo auctionInfo = auctionInfoMongoRepository.findByAuctionIdAndMemberId(auctionId, member.getId()).orElseThrow(() -> new NullPointerException("존재하지 않는 AuctionInfo 입니다."));

        /* 2. 사용자가 경매에 참여 중인지 여부를 DB(auction_info)에서 확인한다. */
        log.info("입찰 신청한 회원의 입찰금 갱신 시작");
        auctionInfo.setBid(bid);

        /* 3. 사용자가 2nd price auction 경매 방식에서 입찰에 성공했는지 여부를 판단한다.  */
        log.info("입찰 성공 여부 판단 시작");
                if (auction.getFirstBid() > bid || (auction.getFirstBid() == bid && auction.getFirstMemberId() != -1)) { // 1등 입찰가보다 적거나 같은 금액 입찰 시도
            log.info("입찰 실패! - 1등 입찰가보다 적은 입찰 금액!");
            if (auction.getSecondBid() < bid && auction.getFirstBid() != bid) { // 2등 입찰가보다 높은 금액이면 표시 2등 입찰가 수정
                log.info("1등 입찰가보다 낮고 2등 입찰가보다 높은 입찰 금액이므로 표기 2등 입찰가 수정");
                auction.setSecondBid(bid);
            }
            auctionJpaRepository.save(auction);

            log.info("bid 끝");

            return 0; // 유력 낙찰자 탈환 실패
        } else { // 1등 입찰가보다 높은 금액 입찰 시도
            log.info("입찰 성공!");
            auction.setSecondBid(auction.getFirstBid());
            /*
            로직 - 기존 auction.getFirstMemberId()의 사용자에게 낙찰 유력 뺐김을 CoolSMS 알림
            */
            auction.setFirstMemberId(member.getId());
            auction.setFirstBid(bid);
            auctionJpaRepository.save(auction);

            log.info("bid 끝");

            return 1; // 유력 낙찰자 탈환 성공
        }
    }
}
