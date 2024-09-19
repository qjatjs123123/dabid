package com.ssafy.dabid;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
//@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
public class DabidApplication {

	public static void main(String[] args) {
		SpringApplication.run(DabidApplication.class, args);
	}

}
