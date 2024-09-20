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
public class BuyerBalanceAndAccount {

    private String buyer_balance;

    private String deal_account;

    private int winning_bid;
}