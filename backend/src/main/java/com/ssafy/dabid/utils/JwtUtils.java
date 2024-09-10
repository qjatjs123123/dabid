package com.ssafy.dabid.utils;

import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Setter
@Component
public class JwtUtils {

    @Value("${jwt.key}")
    private String keyString;

    @Value("${jwt.access.time}")
    private int accessTokenExpiredTime;

    @Value("${jwt.refresh.time}")
    private int refreshTokenExpiredTime;

    private SecretKey key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(keyString));
    }

    public String createAccessToken(String email){
        return createToken(email, accessTokenExpiredTime);
    }

    public String createRefreshToken(String email){
        return createToken(email, refreshTokenExpiredTime);
    }

    public String createToken(String email, int expiredTime){
        Date now = new Date();
        Date expiredDate = new Date(now.getTime() + expiredTime);

        return Jwts.builder()
                .claim("email", email)
                .issuedAt(now)
                .expiration(expiredDate)
                .signWith(key)
                .compact();
    }

    public String getEmailFromToken(String token) throws JwtException {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("email", String.class);
    }
}
