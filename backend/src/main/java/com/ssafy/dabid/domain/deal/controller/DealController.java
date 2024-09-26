package com.ssafy.dabid.domain.deal.controller;

import com.ssafy.dabid.domain.deal.dto.request.CourierRequest;
import com.ssafy.dabid.domain.deal.dto.response.*;
import com.ssafy.dabid.domain.deal.entity.ChatMessage;
import com.ssafy.dabid.domain.deal.entity.Status;
import com.ssafy.dabid.domain.deal.repository.ChatMessageRepository;
import com.ssafy.dabid.domain.deal.service.DealService;
import com.ssafy.dabid.domain.member.entity.Member;
import com.ssafy.dabid.domain.member.repository.MemberRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/deal")
@CrossOrigin(origins = "http://localhost:5173") // 특정 출처 허용
public class DealController {
    private final DealService dealService;
    private final KafkaTemplate<String, ChatMessage> kafkaTemplate;
    private final ChatMessageRepository chatMessageRepository;

    private final MemberRepository memberRepository;
    // Spring Security로 ID받아오는 함수
    public String getCurrentMemberUserKey() {
        return "feacdeaf-54a3-48f2-b9dc-93368666b86c";
    }


    @PostMapping("/account/seller/{deal-id}")
    public InquireDemandDepositAccountBalance selectSellerAccount(@PathVariable("deal-id") int dealId) {
        return dealService.findSellerAccount(dealId, 2);
    }

    @PostMapping("/account/buyer/{deal-id}")
    public BuyerBalanceAndAccount selectBuyerAccount(@PathVariable("deal-id") int dealId) {
        return dealService.findBuyerAccount(dealId, 2);
    }

    @PostMapping("/courier/{deal-id}")
    public Status insertCourier(@PathVariable("deal-id") int dealId,
                                @RequestBody @Valid CourierRequest courierRequest) {
        return dealService.findDeliveryStatus(courierRequest, dealId);
    }

    @PostMapping("/close/{deal-id}")
    public ResponseEntity<String>  closeDeal(@PathVariable("deal-id") int dealId) {
        dealService.closeDealTransaction(dealId);
        return ResponseEntity.ok("거래가 성공적으로 종료되었습니다.");
    }

//    @GetMapping("/list")
//    public ResponseEntity<List<ListDealResponseDto>> listDeal(){
//        String email = SecurityContextHolder.getContext().getAuthentication().getName();
//        log.info("email: {}", email);
//
//        List<ListDealResponseDto> list = dealService.listDeal(email);
//        if(list.isEmpty()){
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 결제 내역이 없을 경우
//        }
//        return new ResponseEntity<>(list, HttpStatus.OK);
//    }

    @GetMapping("/list")
    public ResponseEntity<DealContentListResponseDto> listDeal(@RequestParam(defaultValue = "0") int page,
                                                               @RequestParam(defaultValue = "10") int size) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("email: {}", email);

        List<ListDealResponseDto> list = dealService.listDealPage(email, page, size);

        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
        log.info("닉네임 : {}", member.getNickname());
        // 전체 거래 수를 가져오기 위해 별도의 서비스 메서드를 호출
        long totalCount = dealService.countBySellerOrBuyer(member, member); // 전체 거래 수를 세는 메서드

        if (list.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 결제 내역이 없을 경우
        }

        DealContentListResponseDto response = DealContentListResponseDto.builder()
                .content(list) // List<ListDealResponseDto> 타입
                .totalPages((int) Math.ceil((double) totalCount / size)) // 전체 페이지 수 계산
                .number(page) // 현재 페이지 번호 설정
                .build();

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/list/{id}")
    public DealResponseDto detailDeal(@PathVariable int id){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("email: {}", email);
        return dealService.detailDeal(email, id);
    }

    @PostMapping("/transfer/{dealId}")
    public DealResponseDto transferBalance(@PathVariable int dealId){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return dealService.transferBalance(email, dealId);
    }

    // 스케줄러 임의 실행 테스트 start
    @GetMapping("/test/{auctionId}")
    public void testMakeDeal(@PathVariable int auctionId) {
        dealService.testMakeDeal(auctionId);
    }
    // 스케줄러 임의 실행 테스트 end


    // 메시지 보내기
    @MessageMapping("/chat/message")
    public void sendChatMessage(@Valid ChatMessage chatMessage) {
        // 채팅 메시지 저장
        chatMessageRepository.save(chatMessage);
        log.info("chatMessage: {}", chatMessage);
        kafkaTemplate.send("dabid-topic", chatMessage);

    }

//    // 메시지 조회
    @GetMapping("/chat/{dealId}/messages")
    public List<ChatMessage> getChatMessage(@PathVariable int dealId) {
        return dealService.getChatMessage(dealId);
    }

}
