package com.ssafy.dabid.domain.deal.controller;

import com.ssafy.dabid.domain.deal.dto.response.DealResponseDto;
import com.ssafy.dabid.domain.deal.service.DealService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/deal")
public class DealController {

    private final DealService dealService;

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
