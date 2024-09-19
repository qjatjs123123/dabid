package com.ssafy.dabid.domain.deal.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor  // 기본 생성자 추가
public class InquireDemandDepositAccountBalance {

    @JsonProperty("REC")
    private Rec rec;

    @Getter
    @Setter
    @NoArgsConstructor  // 기본 생성자 추가
    public static class Rec {
        @JsonProperty("accountNo")
        private String accountNo;

        @JsonProperty("accountBalance")
        private String accountBalance;
    }
}
