package com.example.iplteammanagementsystem.demo.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;
import java.net.URI;

// DISABLED - Using application.properties for database configuration instead
// @Configuration
// @Profile("production")
public class DatabaseConfig {

    @Bean
    @Primary
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        
        if (databaseUrl == null) {
            throw new RuntimeException("DATABASE_URL environment variable is not set");
        }
        
        System.out.println("Original DATABASE_URL: " + databaseUrl);
        
        try {
            URI dbUri = new URI(databaseUrl);
            
            String scheme = dbUri.getScheme();
            String host = dbUri.getHost();
            int port = dbUri.getPort();
            String path = dbUri.getPath();
            String userInfo = dbUri.getUserInfo();
            
            // Extract username and password
            String username = "";
            String password = "";
            if (userInfo != null && userInfo.contains(":")) {
                String[] credentials = userInfo.split(":");
                username = credentials[0];
                password = credentials[1];
            }
            
            // Use default PostgreSQL port if not specified
            if (port == -1) {
                port = 5432;
            }
            
            // Build proper JDBC URL
            String jdbcUrl = String.format("jdbc:postgresql://%s:%d%s", host, port, path);
            
            System.out.println("Converted JDBC URL: " + jdbcUrl);
            System.out.println("Username: " + username);
            
            // Create HikariConfig for better connection management
            HikariConfig config = new HikariConfig();
            config.setJdbcUrl(jdbcUrl);
            config.setUsername(username);
            config.setPassword(password);
            config.setDriverClassName("org.postgresql.Driver");
            
            // Connection pool settings
            config.setMaximumPoolSize(5);
            config.setMinimumIdle(1);
            config.setConnectionTimeout(20000);
            config.setIdleTimeout(300000);
            config.setMaxLifetime(1200000);
            
            return new HikariDataSource(config);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse DATABASE_URL: " + databaseUrl, e);
        }
    }
}