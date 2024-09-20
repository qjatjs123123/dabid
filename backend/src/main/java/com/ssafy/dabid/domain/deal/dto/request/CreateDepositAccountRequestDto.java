package com.ssafy.dabid.domain.deal.dto.request;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CreateDepositAccountRequestDto {
    private HeaderDto header;
    private String accountTypeUniqueNo;

    @Getter
    @Setter
    @Builder
    public static class HeaderDto {
        private String apiName;
        private String transmissionDate;
        private String transmissionTime;
        private String institutionCode;
        private String fintechAppNo;
        private String apiServiceCode;
        private String institutionTransactionUniqueNo;
        private String apiKey;
        private String userKey;
    }
}
