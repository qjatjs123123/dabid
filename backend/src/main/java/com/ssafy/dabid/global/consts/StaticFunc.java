package com.ssafy.dabid.global.consts;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiRequest;
import com.ssafy.dabid.domain.deal.dto.request.SsafyApiHeaderRequest;
import net.minidev.json.JSONObject;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import static com.ssafy.dabid.global.consts.StaticConst.*;

public class StaticFunc {
    private static int currentSerialNumber = 0;

    public static String getCurrentDate() {
        LocalDate today = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        return today.format(formatter);
    }


    public static String getCurrentTime() {
        LocalTime now = LocalTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HHmmss");
        return now.format(formatter);
    }

    public static synchronized String getNextSerialNumber() {
        String formattedSerialNumber = String.format("%06d", currentSerialNumber);
        currentSerialNumber = (currentSerialNumber + 1) % (MAX_SERIAL_NUMBER + 1);
        return formattedSerialNumber;
    }

    public static String getCurrentDateTime(String date, String hour) {
        return date + hour + getNextSerialNumber();
    }

    public static String serializeToJson(SsafyApiRequest ssafyApiRequest) {
         ObjectMapper objectMapper = new ObjectMapper();

        try {
            return objectMapper.writeValueAsString(ssafyApiRequest);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            // 예외 발생 시 빈 JSON 객체를 반환
            return "{}";
        }
    }

    public static SsafyApiRequest getSsafyApiRequest(
            SsafyApiHeaderRequest header,
            String accountNo,
            Object transactionBalance, // 실제 사용할 타입으로 변환 필요
            String transactionSummary,
            String depositAccountNo,
            String depositTransactionSummary,
            String withdrawalAccountNo,
            String withdrawalTransactionSummary,
            String accountTypeUniqueNo
    ) {
        return new SsafyApiRequest(
                header,
                accountNo,
                transactionBalance,
                transactionSummary,
                depositAccountNo,
                depositTransactionSummary,
                withdrawalAccountNo,
                withdrawalTransactionSummary,
                accountTypeUniqueNo
        );
    }

    public static SsafyApiHeaderRequest getSsafyApiHeaderRequest(
            String apiName,
            String apiServiceCode,
            String userKey) {
        String date = getCurrentDate();
        String time = getCurrentTime();
        return new SsafyApiHeaderRequest(
                apiName,
                date,
                time,
                institutionCode,
                fintechAppNo,
                apiServiceCode,
                getCurrentDateTime(date, time),
                apiKey,
                userKey
        );
    }
}
