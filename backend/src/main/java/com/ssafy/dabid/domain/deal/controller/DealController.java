package com.ssafy.dabid.domain.deal.controller;

import com.ssafy.dabid.domain.deal.dto.request.CourierRequest;
import com.ssafy.dabid.domain.deal.dto.response.BuyerBalanceAndAccount;
import com.ssafy.dabid.domain.deal.dto.response.DealResponseDto;
import com.ssafy.dabid.domain.deal.dto.response.InquireDemandDepositAccountBalance;
import com.ssafy.dabid.domain.deal.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public void insertCourier(@PathVariable("deal-id") Long dealId,
            @RequestBody CourierRequest courierRequest) {

    }


    @GetMapping("/list")
    public ResponseEntity<List<DealResponseDto>> listDeal(){
//        String email = SecurityUtil.getLoginUsername();
        String email = "abc@naver.com";
        List<DealResponseDto> list = dealService.listDeal(email);
        if(list.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 결제 내역이 없을 경우
        }
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/list/{id}")
    public DealResponseDto detailDeal(@PathVariable int id){
//        String email = SecurityUtil.getLoginUsername();
        String email = "abc@naver.com";
        return dealService.detailDeal(email, id);
    }

    @GetMapping("/test")
    public void test(){
//        String email = SecurityUtil.getLoginUsername();
        String email = "abc@naver.com";
        dealService.createDeal(1, email);
    }
}
