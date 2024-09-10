package com.ssafy.dabid;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Encoders;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.crypto.SecretKey;

@SpringBootTest
class DabidApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void generateKey(){
		SecretKey key = Jwts.SIG.HS256.key().build();
		String secretString = Encoders.BASE64.encode(key.getEncoded());
		System.out.println("secretString = " + secretString);
	}
}
