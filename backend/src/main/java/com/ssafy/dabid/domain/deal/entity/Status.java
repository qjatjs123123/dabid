package com.ssafy.dabid.domain.deal.entity;

public enum Status {
    BID_SUCCESS,        // 낙찰
    PAYMENT_COMPLETE,   // 입금완료
    IN_DELIVERY,        // 배달 중
    DELIVERY_COMPLETE,  // 배달완료
    TRANSACTION_DONE    // 거래 완료
}

