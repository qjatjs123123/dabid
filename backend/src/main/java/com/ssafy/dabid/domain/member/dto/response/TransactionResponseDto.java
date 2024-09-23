package com.ssafy.dabid.domain.member.dto.response;

import com.ssafy.dabid.global.status.CommonResponseDto;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionResponseDto extends CommonResponseDto {
    private List<HistoryItem> list;

    @Getter
    @Setter
    @Builder
    @AllArgsConstructor
    public static class HistoryItem {
        private String transactionDate;
        private String transactionTime;
        private String transactionTypeName;
        private String transactionAccountNo;
        private String transactionBalance;
        private String transactionAfterBalance;
        private String transactionSummary;

    }
}
