package com.ssafy.dabid.domain.deal.service;

import com.ssafy.dabid.domain.deal.dto.request.SsafyApiHeaderRequest;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiRequest;
import com.ssafy.dabid.domain.deal.entity.Account;
import com.ssafy.dabid.domain.deal.entity.Deal;
import com.ssafy.dabid.domain.deal.repository.AccountRepository;
import com.ssafy.dabid.domain.deal.repository.DealRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.ssafy.dabid.global.consts.StaticFunc.*;
import static com.ssafy.dabid.global.consts.StaticConst.*;

@Service
@RequiredArgsConstructor
public class DealServiceImpl implements DealService {
    private final SsafyApiClient ssafyApiClient;
    private final AccountRepository accountRepository;
    private final DealRepository dealRepository;

    @Override
    public void findSellerAccount(int dealId, int userKey) {
        SsafyApiHeaderRequest ssafyApiHeaderRequest = getSsafyApiHeaderRequest(
                SELELCT_ACCOUNT_BALANCE_CODE,
                SELELCT_ACCOUNT_BALANCE_CODE,
                "937d7d39-eccc-4741-bf54-af154e279537" //임시 나중에 Security에서 멤버에서 가져올것
        );
        Deal deal = dealRepository.findById(dealId);
        int sellerId = deal.getSeller().getId();

        Account userAccount = accountRepository.findByMember_Id(sellerId);
        SsafyApiRequest ssafyApiRequest = SsafyApiRequest.builder()
                .header(ssafyApiHeaderRequest)
                .accountNo(userAccount.getAccount_number())
                .build();
        ssafyApiClient.getSsafyApiResponse(SELELCT_ACCOUNT_BALANCE_CODE, ssafyApiRequest);
    }
}
