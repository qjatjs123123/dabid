package com.ssafy.dabid.domain.deal.dto.request;

import com.ssafy.dabid.domain.deal.entity.CarrierId;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor // 기본 생성자를 추가합니다.
@AllArgsConstructor // 모든 필드를 사용하는 생성자도 필요하면 추가합니다.
public class CourierRequestNo  {
    private String carrierId;
    private String trackingNumber;
}
