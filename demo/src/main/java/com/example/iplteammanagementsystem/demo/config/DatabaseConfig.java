package com.example.iplteammanagementsystem.demo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.boot.jdbc.DataSourceBuilder;

import javax.sql.DataSource;

@Configuration
@Profile("production")
public class DatabaseConfig {

    @Bean
    @ConfigurationProperties("spring.datasource")
    public DataSource dataSource() {
        String databaseUrl = System.getenv("DATABASE_URL");
        
        if (databaseUrl != null && databaseUrl.startsWith("postgres://")) {
            // Convert Render's postgres:// URL to jdbc:postgresql:// format
            databaseUrl = databaseUrl.replace("postgres://", "jdbc:postgresql://");
        }
        
        return DataSourceBuilder
                .create()
                .url(databaseUrl != null ? databaseUrl : "jdbc:postgresql://localhost:5432/ipl_management")
                .driverClassName("org.postgresql.Driver")
                .build();
    }
}