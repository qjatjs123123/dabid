package com.ssafy.dabid.global.status;

public interface StatusCode {
    String SUCCESS = "SU";
    String VALIDATION_FAIL = "VF";
    String DUPLICATE_EMAIL = "DE";
    String DUPLICATE_NICKNAME = "DN";
    String DUPLICATE_PHONE_NUMBER = "DP";
    String NOT_ENOUGH_POINTS = "NEP";
    String NOT_VERIFIED_ACCOUNT = "NVA";
    String EXTERNAL_API_ERROR = "EAE";
}
