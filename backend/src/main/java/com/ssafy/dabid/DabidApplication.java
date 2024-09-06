package com.ssafy.dabid;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class DabidApplication {

	public static void main(String[] args) {
		SpringApplication.run(DabidApplication.class, args);
	}

}
