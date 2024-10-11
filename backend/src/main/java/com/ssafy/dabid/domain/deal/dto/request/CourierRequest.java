package com.ssafy.dabid.domain.deal.dto.request;

import com.fasterxml.jackson.annotation.JsonValue;
import com.ssafy.dabid.domain.deal.entity.CarrierId;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor // 기본 생성자를 추가합니다.
@AllArgsConstructor // 모든 필드를 사용하는 생성자도 필요하면 추가합니다.

public class CourierRequest {

    private CarrierId carrierId;
    private String trackingNumber;

    // Enum을 문자열로 변환할 수 있도록 @JsonValue 애너테이션을 추가
    @JsonValue
    public CarrierId getCarrierId() {
        return carrierId;
    }
}