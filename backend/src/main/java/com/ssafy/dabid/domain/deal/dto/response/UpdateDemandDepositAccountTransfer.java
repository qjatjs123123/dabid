package com.ssafy.dabid.domain.deal.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor  // 기본 생성자 추가
public class UpdateDemandDepositAccountTransfer {

    @JsonProperty("REC")
    private List<Rec> rec;

    @Getter
    @Setter
    @NoArgsConstructor  // 기본 생성자 추가
    public static class Rec {
        @JsonProperty("transactionUniqueNo")
        private String transactionUniqueNo;

        @JsonProperty("accountNo")
        private String accountNo;

        @JsonProperty("transactionDate")
        private String transactionDate;

        @JsonProperty("transactionType")
        private String transactionType;

        @JsonProperty("transactionTypeName")
        private String transactionTypeName;

        @JsonProperty("transactionAccountNo")
        private String transactionAccountNo;
    }
}
