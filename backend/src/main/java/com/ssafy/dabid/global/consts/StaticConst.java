package com.ssafy.dabid.global.consts;

public class StaticConst {
    public static final int MAX_MEMORY_SIZE = 5 * 1024 * 1024;
    public static final long ONE_MINUTE = 60 * 1000L;
    public static final String apiKey = "931bc6f77a3f40b4bae76c32f9270080";
    public static final String institutionCode = "00100";
    public static final String fintechAppNo = "001";
    public static final int MAX_SERIAL_NUMBER = 999999;

    // code
    public static final String SELELCT_ACCOUNT_BALANCE_CODE = "inquireDemandDepositAccountBalance";
    public static final String CREATE_DEMAND_DEPOSIT_ACCOUNT_CODE = "createDemandDepositAccount";
    public static final String DEPOSIT_IN_CODE = "updateDemandDepositAccountDeposit";
    public static final String DEPOSIT_OUT_CODE = "updateDemandDepositAccountWithdrawal";
    public static final String TRANSACTION_HISTORY_CODE = "inquireTransactionHistoryList";
    public static final String ACCOUNT_BALANCE_CODE = "inquireDemandDepositAccountBalance";
    public static final String ACCOUNT_AUTH_CODE = "openAccountAuth";
    public static final String CHECK_AUTH_CODE = "checkAuthCode";
}
