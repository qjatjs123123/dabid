package com.ssafy.dabid.domain.deal.controller;

import com.ssafy.dabid.domain.deal.dto.request.CourierRequest;
import com.ssafy.dabid.domain.deal.dto.response.BuyerBalanceAndAccount;
import com.ssafy.dabid.domain.deal.dto.response.DealResponseDto;
import com.ssafy.dabid.domain.deal.dto.response.InquireDemandDepositAccountBalance;
import com.ssafy.dabid.domain.deal.dto.response.ListDealResponseDto;
import com.ssafy.dabid.domain.deal.dto.response.UpdateDemandDepositAccountTransfer;
import com.ssafy.dabid.domain.deal.entity.Status;
import com.ssafy.dabid.domain.deal.service.DealService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/deal")
public class DealController {
    private final DealService dealService;

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


    @GetMapping("/list")
    public ResponseEntity<List<ListDealResponseDto>> listDeal(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("email: {}", email);

        List<ListDealResponseDto> list = dealService.listDeal(email);
        if(list.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 결제 내역이 없을 경우
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
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

}
