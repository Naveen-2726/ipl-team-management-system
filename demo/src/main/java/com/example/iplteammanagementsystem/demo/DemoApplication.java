package com.example.iplteammanagementsystem.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = {"com.examly.springapp", "com.example.iplteammanagementsystem.demo"})
@EnableJpaRepositories(basePackages = "com.examly.springapp.repository")
@EntityScan(basePackages = "com.examly.springapp.entity")
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("IPL  MANAGEMENT SYSTEM");
	}

}
