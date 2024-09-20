//package com.ssafy.dabid.global.api.ssafy.response;
//
//import com.fasterxml.jackson.annotation.JsonInclude;
//import com.fasterxml.jackson.annotation.JsonProperty;
//import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
//import lombok.*;
//
//import java.util.List;
//import java.util.Map;
//
//@JsonInclude(JsonInclude.Include.NON_NULL)
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//public class TransactionHistoryResponse extends SsafyApiResponse {
//    @JsonProperty("REC")
//    private TransactionHistoryResponseList rec;
//}

package com.ssafy.dabid.global.api.ssafy.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiHeaderResponse;
import com.ssafy.dabid.domain.deal.dto.response.SsafyApiResponse;
import lombok.*;

import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionHistoryResponse {
    @JsonProperty("Header")
    private SsafyApiHeaderResponse header;

    @JsonProperty("REC")
    private Rec rec;

    @Getter
    @Setter
    @NoArgsConstructor  // 기본 생성자 추가
    public static class Rec {
        private Long totalCount;

        private List<HistoryItem> list;

        @Getter
        @Setter
        @NoArgsConstructor  // 기본 생성자 추가
        public static class HistoryItem {
            private String transactionUniqueNo;
            private String transactionDate;
            private String transactionTime;
            private String transactionType;
            private String transactionTypeName;
            private String transactionAccountNo;
            private String transactionBalance;
            private String transactionAfterBalance;
            private String transactionSummary;
            private String transactionMemo;
        }
    }
}
