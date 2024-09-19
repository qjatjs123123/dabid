package com.ssafy.dabid.domain.deal.dto.response;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CreateDepositAccountResponseDto {

    private Header header;
    private Rec rec;

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Header {
        private String responseCode;
        private String responseMessage;
        private String apiName;
        private String transmissionDate;
        private String transmissionTime;
        private String institutionCode;
        private String apiKey;
        private String apiServiceCode;
        private String institutionTransactionUniqueNo;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Rec {
        private String bankCode;
        private String accountNo;
        private Currency currency;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Currency {
        private String currency;
        private String currencyName;
    }
}
