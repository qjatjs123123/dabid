package com.ssafy.dabid.global.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Setter
@Component
public class JwtUtils {

    @Value("${jwt.key}")
    private String keyString;

    @Value("${jwt.access.time}")
    private int accessTokenExpiresIn;

    @Value("${jwt.refresh.time}")
    private int refreshTokenExpiresIn;

    private SecretKey key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(keyString));
    }

    public String createToken(String email, TokenType tokenType){
        Date now = new Date();
        int expiresIn = tokenType == TokenType.ACCESS ? accessTokenExpiresIn : refreshTokenExpiresIn;
        Date expiredDate = new Date(now.getTime() + expiresIn);

        JwtBuilder builder = Jwts.builder();

        if(tokenType == TokenType.ACCESS)
            builder.claim("email", email);

        return builder.issuedAt(now)
                .expiration(expiredDate)
                .signWith(key)
                .compact();
    }

    //유효한 액세스 토큰일 경우 email을, 그렇지 않으면 null을 반환한다.
    public String extractTokenIfValid(String token, TokenType tokenType) throws JwtException {
        if(token == null || token.isEmpty())
            return null;

        Claims payloads = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        Date expiredDate = payloads.getExpiration();
        if(expiredDate.before(new Date()))
            return null;

        if(tokenType == TokenType.REFRESH)
            return null;

        return payloads.get("email", String.class);
    }
}
