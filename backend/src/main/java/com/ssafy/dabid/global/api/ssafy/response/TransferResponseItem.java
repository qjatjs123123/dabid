package com.ssafy.dabid.global.api.ssafy.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransferResponseItem {
    private String transactionUniqueNo;
    private String accountNo;
    private String transactionDate;
    private String transactionType;
    private String transactionTypeName;
    private String transactionAccountNo;
}