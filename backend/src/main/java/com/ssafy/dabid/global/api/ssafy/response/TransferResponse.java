package com.ssafy.dabid.global.api.ssafy.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiHeaderResponse;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
import com.ssafy.dabid.domain.deal.dto.response.UpdateDemandDepositAccountTransfer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@Getter
@Setter
public class TransferResponse {

    @JsonProperty("Header")
    private SsafyApiHeaderResponse header;

    @JsonProperty("REC")
    private List<Rec> rec;

    @Getter
    @Setter
    @NoArgsConstructor  // 기본 생성자 추가
    public static class Rec {
        private String transactionUniqueNo;
        private String accountNo;
        private String transactionDate;
        private String transactionType;
        private String transactionTypeName;
        private String transactionAccountNo;
    }
}
