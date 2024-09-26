package com.ssafy.dabid.domain.deal.dto.request;

import com.ssafy.dabid.domain.deal.entity.CarrierId;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CourierRequest {

    private CarrierId carrierId;
    private String trackingNumber;
}
