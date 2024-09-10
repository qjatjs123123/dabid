package com.ssafy.dabid.domain.auction.service;

import com.ssafy.dabid.domain.auction.dto.request.RegistrationAuctionDto;
import com.ssafy.dabid.domain.auction.dto.response.AuctionDto;
import com.ssafy.dabid.domain.auction.dto.response.AuctionListDto;
import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.auction.entity.Category;
import com.ssafy.dabid.domain.auction.repository.AuctionJpaRepository;
import com.ssafy.dabid.domain.job.service.QuartzSchedulerService;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberAccountRepository;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.SchedulerException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuctionService {
    private final AuctionJpaRepository auctionJpaRepository;
    private final MemberRepository memberRepository;
    private final MemberAccountRepository memberAccountRepository;
    private final QuartzSchedulerService schedulerService;

    public List<AuctionListDto> getAuctions(){
        log.info("getAuctions 시작");
        log.info("Active Auction 조회");
        List<Auction> auctions = auctionJpaRepository.findAllAuctions();

        log.info("조회된 Auction을 AuctionListDto로 변환");
        List<AuctionListDto> results = new ArrayList<>();
        for (Auction auction : auctions){
            results.add(
              AuctionListDto.builder()
                      .auctionId(auction.getId())
                      .title(auction.getTitle())
                      .image(null)
                      .category(auction.getCategory().toString())
                      .build()
            );
        }

        log.info("getAuctions 종료");
        return results;
    }

    public AuctionDto getAuction(int auctionId, int memberId){
        log.info("getAuction 시작");
        log.info("auctionId: " + auctionId + " 조회");
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않은 Auction"));

        log.info("Dto 변환");
        AuctionDto result = AuctionDto.builder()
                .title(auction.getTitle())
                .name(auction.getName())
                .category(auction.getCategory().toString())
                .detail(auction.getDetail())
                .deposit(auction.getDeposit())
                .isFirstMember(auction.getFirstMemberId() == memberId)
                .build();

        log.info("getAuction 종료");
        return result;
    }

    public void registPost(RegistrationAuctionDto dto, int memberId) throws SchedulerException {
        log.info("registPost 시작");

        log.info("계좌 인증 확인");
        if(memberAccountRepository.findByMemberId(memberId) == 0)
            throw new IllegalStateException("계좌가 인증되지 않았습니다.");

        log.info("포인트 확인");
        if(memberRepository.findPointById(memberId) < 5000)
            throw new IllegalStateException("포인트가 충분하지 않습니다.");

        log.info("member :" + memberId + " 조회");
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NullPointerException("존재하지 않은 회원"));

        log.info("auction 저장");
        Auction auction = auctionJpaRepository.save(Auction.builder()
                .title(dto.getTitle())
                        .member(member)
                        .name(dto.getName())
                        .category(Category.valueOf(dto.getCategory()))
                        .detail(dto.getDetail())
                        .deposit(dto.getDeposit())
                        .firstMemberId(-1)
                        .finishedAt(LocalDateTime.now().plusDays((dto.getDuration())))
                        .secondBid(dto.getInitValue())
                        .build()
                );
        log.info("registPost 종료");

        // QuartzSchedulerService에서 경매 종료일자에 동작하도록 스케줄링 설정
        schedulerService.endAuctionAndMakeDeal(auction.getId(), auction.getCreatedAt(), auction.getFinishedAt());
    }

    public void inActivatePost(int auctionId) throws SchedulerException {
        log.info("inActivePost 시작");
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않은 auction"));

        // i. 경매 참여자 존재 시, 판매자 보증금 회수 + 참여자에게 포인트 돌려주기
        // ii. 경매 참여자 존재 X 시, 판매자 보증금 회수

        log.info("auctionId: " + auctionId + " kill");
        auction.kill();

        auctionJpaRepository.save(auction);

        log.info("inActivePost 삭제");

        // 경매 물품 중도 삭제 시, 경매 종료 시 동작하는 Job Scheduler도 같이 삭제
        schedulerService.deleteAuctionJob(auctionId);
    }
}
