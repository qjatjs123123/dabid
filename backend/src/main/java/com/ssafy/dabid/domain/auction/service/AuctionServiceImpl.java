package com.ssafy.dabid.domain.auction.service;

import com.ssafy.dabid.domain.auction.dto.request.RegistrationAuctionDto;
import com.ssafy.dabid.domain.auction.dto.request.SearchAuctionTitle;
import com.ssafy.dabid.domain.auction.dto.response.AuctionDto;
import com.ssafy.dabid.domain.auction.dto.response.AuctionListDto;
import com.ssafy.dabid.domain.auction.entity.*;
import com.ssafy.dabid.domain.auction.entity.mongo.AuctionInfo;
import com.ssafy.dabid.domain.auction.mapper.AuctionMapper;
import com.ssafy.dabid.domain.auction.repository.AuctionElasticSearchRepository;
import com.ssafy.dabid.domain.auction.repository.AuctionImageRepository;
import com.ssafy.dabid.domain.auction.repository.AuctionInfoRepository;
import com.ssafy.dabid.domain.auction.repository.AuctionJpaRepository;
import com.ssafy.dabid.domain.auction.repository.mongo.AuctionInfoMongoRepository;
import com.ssafy.dabid.domain.job.service.QuartzSchedulerService;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberAccountRepository;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import com.ssafy.dabid.global.utils.S3Util;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.SchedulerException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuctionServiceImpl implements AuctionService{
    private final AuctionMapper auctionMapper;
    @Value("${point.buy.deposit}")
    private int deposit;

    private final AuctionJpaRepository auctionJpaRepository;
    private final AuctionElasticSearchRepository auctionElasticSearchRepository;
    private final AuctionInfoRepository auctionInfoRepository;
    private final AuctionInfoMongoRepository auctionInfoMongoRepository;
    private final AuctionImageRepository auctionImageRepository;
    private final MemberRepository memberRepository;
    private final MemberAccountRepository memberAccountRepository;

    private final QuartzSchedulerService schedulerService;
    private final S3Util s3Util;

    //    public List<AuctionListDto> getAuctions(){
//        log.info("getAuctions 시작");
//        log.info("Active Auction 조회");
//        List<Auction> auctions = auctionJpaRepository.findAllAuctions();
//
//        log.info("조회된 Auction을 AuctionListDto로 변환");
//        List<AuctionListDto> results = new ArrayList<>();
//        for (Auction auction : auctions){
//            results.add(
//                    AuctionListDto.builder()
//                            .auctionId(auction.getId())
//                            .title(auction.getTitle())
//                            .thumbnail(s3Util.generateFileUrl(auction.getThumbnail()))
//                            .category(auction.getCategory().toString())
//                            .build()
//            );
//        }
//
//        log.info("getAuctions 종료");
//        return results;
//    }

    @Override
    public List<AuctionListDto> getAuctions(){
        log.info("getAuctions 시작");
        log.info("Active Auction 조회");

        List<AuctionDocument> auctions = auctionElasticSearchRepository.findAllByOrderByCreatedAtDesc();

        log.info("Auction 참가자 수 조회");

        log.info("조회된 Auction을 AuctionListDto로 변환");
        List<AuctionListDto> results = new ArrayList<>();
        for (AuctionDocument auctionDocument : auctions){
            results.add(
                    AuctionListDto.builder()
                            .auctionId(auctionDocument.getId())
                            .title(auctionDocument.getTitle())
                            .thumbnail(s3Util.generateFileUrl(auctionDocument.getThumbnail()))
                            .secondBid(auctionDocument.getSecondBid())
                            .person(auctionInfoMongoRepository.countByAuctionId(Integer.parseInt(auctionDocument.getId())))
                            .finishedAt(auctionDocument.getFinishedAt())
                            .createdAt(auctionDocument.getCreatedAt())
                            .build()
            );
        }

        log.info("getAuctions 종료");
        return results;
    }

    @Override
    public List<AuctionListDto> getAuctionsTitle(SearchAuctionTitle searchAuctionTitle){
        log.info("getAuctions 시작");
        log.info("Active Auction 조회");

        String keyword = searchAuctionTitle.getTitle();
        List<AuctionDocument> auctions;
        if(keyword == null) {
            auctions = auctionElasticSearchRepository.findAllByOrderByCreatedAtDesc();
        }
        else {
            keyword = keyword.trim();
            auctions = auctionElasticSearchRepository.findByTitleContainingOrderByCreatedAtDesc(keyword);
        }

        log.info("Auction 참가자 수 조회");

        log.info("조회된 Auction을 AuctionListDto로 변환");
        List<AuctionListDto> results = new ArrayList<>();
        for (AuctionDocument auctionDocument : auctions){
            results.add(
                    AuctionListDto.builder()
                            .auctionId(auctionDocument.getId())
                            .title(auctionDocument.getTitle())
                            .thumbnail(s3Util.generateFileUrl(auctionDocument.getThumbnail()))
                            .secondBid(auctionDocument.getSecondBid())
                            .person(auctionInfoMongoRepository.countByAuctionId(Integer.parseInt(auctionDocument.getId())))
                            .finishedAt(auctionDocument.getFinishedAt())
                            .createdAt(auctionDocument.getCreatedAt())
                            .build()
            );
        }

        log.info("getAuctions 종료");
        return results;
    }

    @Override
    public List<AuctionListDto> getAuctionsTitleTest(SearchAuctionTitle searchAuctionTitle){
        log.info("getAuctionsTest 시작");
        log.info("Active Auction 조회");

        String keyword = searchAuctionTitle.getTitle();
        List<Auction> auctions;
        if(keyword == null) {
            auctions = auctionJpaRepository.findAllByOrderByCreatedAtDesc();
        }
        else {
            keyword = keyword.trim();
            auctions = auctionJpaRepository.findByTitleContainingOrderByCreatedAtDesc(keyword);
        }

        log.info("Auction 참가자 수 조회");

        log.info("조회된 Auction을 AuctionListDto로 변환");
        List<AuctionListDto> results = new ArrayList<>();
        for (Auction auction : auctions){
            results.add(
                    AuctionListDto.builder()
                            .auctionId(String.valueOf(auction.getId()))
                            .title(auction.getTitle())
                            .thumbnail(s3Util.generateFileUrl(auction.getThumbnail()))
                            .secondBid(String.valueOf(auction.getSecondBid()))
                            .person(auctionInfoMongoRepository.countByAuctionId(auction.getId()))
                            .finishedAt(auction.getFinishedAt())
                            .createdAt(auction.getCreatedAt())
                            .build()
            );
        }

        log.info("getAuctionsTest 종료");
        return results;
    }

    @Override
    public AuctionDto getAuction(int auctionId){
        log.info("getAuction 시작");

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("사용자 정보 읽어오기: " + email);

        int memberId = memberRepository.findByEmail(email).orElseThrow(() -> new NullPointerException("존재하지 않은 Member")).getId();

        log.info("auctionId: " + auctionId + " 조회");
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않은 Auction"));

        AuctionInfo auctionInfo = auctionInfoMongoRepository.findByAuctionIdAndMemberId(auctionId, memberId).orElse(null);
        List<AuctionImage> auctionImages = auctionImageRepository.findByAuction_Id(auctionId);
        List<String> auctionImageUrls = new ArrayList<>();

        for(AuctionImage auctionImage : auctionImages) {
            auctionImageUrls.add(s3Util.generateFileUrl(auctionImage.getImageUrl()));
        }

        int count = auctionInfoMongoRepository.countByAuctionId(auctionId);
        log.info("Dto 변환");
        AuctionDto result = AuctionDto.builder()
                .auctionId(auctionId)
                .firstBid(auction.getFirstBid())
                .title(auction.getTitle())
                .nickname(auction.getMember().getNickname())
                .profileImage(auction.getMember().getImageUrl())
                .detail(auction.getDetail())
                .deposit(auction.getDeposit())
                .isFirstMember(auction.getFirstMemberId() == memberId)
                .isOwner(auction.getMember().getId() == memberId)
                .isParticipant(auctionInfo != null)
                .person(count)
                .finishedAt(auction.getFinishedAt())
                .bid(auction.getSecondBid())
                .images(auctionImageUrls)
                .build();

        log.info("getAuction 종료");
        return result;
    }

    @Override
    public void registPost(RegistrationAuctionDto dto) throws SchedulerException {
        log.info("registPost 시작");

        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("사용자 정보 읽어오기: " + email);

        int memberId = memberRepository.findByEmail(email).orElseThrow(() -> new NullPointerException("존재하지 않은 Member")).getId();


        log.info("계좌 인증 확인");
        if(!memberAccountRepository.findByMemberId(memberId).getIsActive()) {
            throw new IllegalStateException("계좌가 인증되지 않았습니다.");
        }

        log.info("member :" + memberId + " 조회");
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NullPointerException("존재하지 않은 회원"));

        log.info("포인트 확인");
        if(member.getPoint() < deposit)
            throw new IllegalStateException("포인트가 충분하지 않습니다.");

        member.decreasePoint(deposit);

        log.info("S3 이미지 가져오기");
        List<String> imageList = s3Util.uploadFiles(dto.getImages());

        log.info("auction 저장");
        Auction auction = Auction.builder()
                .title(dto.getTitle())
                .member(member)
                .detail(dto.getDetail())
                .deposit((int)(dto.getInitValue() * 0.3))
                .firstMemberId(-1)
                .finishedAt(LocalDateTime.now().plusSeconds((dto.getDuration())))
                .firstBid(dto.getInitValue())
                .secondBid(dto.getInitValue())
                .thumbnail(imageList.get(0))
                .build();

        auction = auctionJpaRepository.save(auction);
        AuctionDocument auctionDocument = auctionElasticSearchRepository.save(auctionMapper.toDocument(auction));

        log.info("경매 images 리스트 저장");
        for(String image : imageList) {
            auctionImageRepository.save(AuctionImage.builder()
                    .auction(auction)
                    .imageUrl(image)
                    .build()
            );
        }

        log.info("registPost 종료");

        // QuartzSchedulerService에서 경매 종료일자에 동작하도록 스케줄링 설정
        schedulerService.endAuctionAndMakeDeal(auction.getId(), auction.getCreatedAt(), auction.getFinishedAt());
    }

    @Override
    public void inActivatePost(int auctionId) throws SchedulerException {
        log.info("inActivePost 시작");
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않은 auction"));

        // i. 경매 참여자 존재 시, 판매자 보증금 회수 + 참여자에게 포인트 돌려주기
        if(isExistParticipant(auctionId)){
            returnBuyerPointWhenGiveUp(auctionId, auction.getDeposit());
        }else{ // ii. 경매 참여자 존재 X 시, 판매자 보증금 회수
            returnSellerPoint(auctionId);
        }

        log.info("auctionId: " + auctionId + " kill");
        auction.kill();
        auctionJpaRepository.save(auction);

        AuctionDocument auctionDocument = auctionElasticSearchRepository.findById(String.valueOf(auction.getId())).orElse(null);
        if(auctionDocument != null) {
            auctionElasticSearchRepository.delete(auctionDocument);
        }

        log.info("inActivePost 삭제");

        // 경매 물품 중도 삭제 시, 경매 종료 시 동작하는 Job Scheduler도 같이 삭제
        schedulerService.deleteAuctionJob(auctionId);
    }

    @Override
    public boolean isExistParticipant(int auctionId){
        return auctionInfoMongoRepository.countByAuctionId(auctionId) > 0;
    }

    /**
     * 경매 중도 포기 - 판매자 보증금 먹고, 입찰자에게 돌려주기
     * @param auctionId
     */
    @Override
    public void returnBuyerPointWhenGiveUp(int auctionId, int buyerDeposit){
        List<Member> members = memberRepository.findParticipantByAuctionId(auctionId);

        for(Member member : members){
            member.increasePoint(buyerDeposit);
            memberRepository.save(member);
        }
    }

    /**
     * 경매 기간 만료 - 1등 빼고 입찰자에게 돌려주기
     * @param auctionId
     */
    @Override
    public void returnBuyerPointWhenExpired(int auctionId, int firstMemberId, int buyerDeposit){
        List<Member> members = memberRepository.findParticipantByAuctionId(auctionId);

        for(Member member : members){
            if(member.getId() == firstMemberId) { continue; }

            member.increasePoint(buyerDeposit);
            memberRepository.save(member);
        }
    }

    /**
     * 판매자에게 돌려주기
     * @param auctionId
     */
    @Override
    public void returnSellerPoint(int auctionId){
        Auction auction = auctionJpaRepository.findById(auctionId).orElseThrow(() -> new NullPointerException("존재하지 않은 Auction"));

        Member member = auction.getMember();
        member.increasePoint(deposit);

        memberRepository.save(member);
    }
}
