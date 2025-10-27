package com.examly.springapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.Connection;

@Component
@Order(1) // Run before DataLoader
public class DatabaseConnectionTest implements CommandLineRunner {

    @Autowired
    private DataSource dataSource;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("=== Testing Database Connection ===");
        
        try (Connection connection = dataSource.getConnection()) {
            System.out.println("✓ Database connection successful!");
            System.out.println("Database URL: " + connection.getMetaData().getURL());
            System.out.println("Database Product: " + connection.getMetaData().getDatabaseProductName());
            System.out.println("Database Version: " + connection.getMetaData().getDatabaseProductVersion());
        } catch (Exception e) {
            System.err.println("✗ Database connection failed!");
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
        }
        
        System.out.println("=== Database Connection Test Complete ===");
    }
}