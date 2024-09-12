package com.ssafy.dabid.utils;

import com.ssafy.dabid.global.utils.JwtUtils;
import com.ssafy.dabid.global.utils.TokenType;
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

        String accessToken = jwtUtils.createToken(email, TokenType.ACCESS);
        String emailFromToken = jwtUtils.extractTokenIfValid(accessToken, TokenType.ACCESS);

        assertTrue(email.equals(emailFromToken));
    }
}