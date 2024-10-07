package com.ssafy.dabid.domain.auction.service;

import com.ssafy.dabid.domain.auction.entity.Auction;
import com.ssafy.dabid.domain.auction.repository.AuctionJpaRepository;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import com.ssafy.dabid.global.config.CoolSMSConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BiddingSMSService {

    private final MemberRepository memberRepository;
    private final AuctionJpaRepository auctionJpaRepository;
    private final DefaultMessageService messageService;

    public void sendSellerAndBidder(int auctionId) {
        Auction auction = auctionJpaRepository.findById(auctionId)
                .orElseThrow(() -> new NullPointerException("존재하지 않은 Auction입니다."));
        Member seller = memberRepository.findById(auction.getMember().getId())
                .orElseThrow(() -> new NullPointerException("판매자는 존재하지 않는 Member입니다."));
        Member bidder = memberRepository.findById(auction.getFirstMemberId())
                .orElseThrow(() -> new NullPointerException("낙찰자는 존재하지 않는 Member입니다."));

        log.info("경매자와 낙찰자에게 메시지 알림 전송 start");

        Message message = new Message();
        message.setFrom(CoolSMSConfig.SENDER);
        message.setTo(seller.getPhoneNumber());
        message.setText("다비드 경매 알림: 등록된 상품이 낙찰되었습니다! 지금 접속해서 확인해주세요!");
        SingleMessageSentResponse responseSeller = messageService.sendOne(new SingleMessageSendingRequest(message));

        message.setTo(bidder.getPhoneNumber());
        message.setText("다비드 경매 알림: 낙찰 성공한 상품이 있습니다! 지금 접속해서 확인해주세요!");
        SingleMessageSentResponse responseBidder = messageService.sendOne(new SingleMessageSendingRequest(message));

        log.info("경매자와 낙찰자에게 메시지 알림 전송 end");
    }

    public void sendParticipant(Member member) {
        Member participant = memberRepository.findById(member.getId()).orElse(null);
        if (participant == null) { return; }

        Message message = new Message();
        message.setFrom(CoolSMSConfig.SENDER);
        message.setTo(participant.getPhoneNumber());
        message.setText("다비드 경매 알림: 참여중인 경매가 중도취소되었습니다! 포인트를 확인해주세요!");
        SingleMessageSentResponse responseSeller = messageService.sendOne(new SingleMessageSendingRequest(message));
    }
}

/*
Message message = new Message();
message.setFrom(CoolSMSConfig.SENDER);
message.setTo(phoneNumber);
message.setText("다비드 휴대전화 인증 코드: " + code);

SingleMessageSentResponse response = messageService.sendOne(new SingleMessageSendingRequest(message));
*/
