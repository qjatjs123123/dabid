package com.ssafy.dabid.domain.deal.entity;

public enum Status {
    BID_SUCCESS,        // 낙찰
    PAYMENT_COMPLETE,   // 입금완료
    IN_TRANSIT,        // 배달 중
    DELIVERED,  // 배달완료
    TRANSACTION_DONE    // 거래 완료
}

