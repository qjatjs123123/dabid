package com.ssafy.dabid.domain.deal.controller;

import com.ssafy.dabid.domain.deal.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/deal")
@RequiredArgsConstructor
public class DealController {
    private final DealService dealService;

    // Spring Security로 ID받아오는 함수
    public String getCurrentMemberUserKey() {
        return "feacdeaf-54a3-48f2-b9dc-93368666b86c";
    }


    @PostMapping("/account/seller/{deal-id}")
    public void selectSellerAccount(@PathVariable("deal-id") int dealId) {
        dealService.findSellerAccount(dealId, 2);
    }

}
