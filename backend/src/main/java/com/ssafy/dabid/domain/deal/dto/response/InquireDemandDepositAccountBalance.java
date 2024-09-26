package com.ssafy.dabid.domain.deal.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
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
