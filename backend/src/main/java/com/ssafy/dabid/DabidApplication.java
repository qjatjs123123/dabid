package com.ssafy.dabid;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

//@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@SpringBootApplication
@EnableJpaAuditing
public class DabidApplication {

	public static void main(String[] args) {
		SpringApplication.run(DabidApplication.class, args);
	}

}
