package com.ssafy.dabid.utils;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JwtUtilsTest {
    @Autowired
    JwtUtils jwtUtils;

    @Test
    void generatedTokenIsCorrect() {
        String email = "xorjsghkd1011@gmail.com";

        String accessToken = jwtUtils.createAccessToken(email);
        String emailFromToken = jwtUtils.getEmailFromToken(accessToken);

        assertTrue(email.equals(emailFromToken));
    }
}