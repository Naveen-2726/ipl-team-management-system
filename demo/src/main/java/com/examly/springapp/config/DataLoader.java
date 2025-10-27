package com.examly.springapp.config;

import com.examly.springapp.entity.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {

    @Autowired
    private UserRepository userRepository;



    @Autowired
    private PasswordEncoder passwordEncoder;

    @Bean
    @Order(2) // Run after DatabaseConnectionTest
    CommandLineRunner initDatabase() {
        return args -> {
            System.out.println("=== DataLoader: Starting database initialization ===");
            
            try {
                // Check total user count
                long userCount = userRepository.count();
                System.out.println("Current user count in database: " + userCount);
                
                // Create default admin user if not exists
                if (!userRepository.existsByUsername("admin")) {
                    User admin = new User();
                    admin.setUsername("admin");
                    admin.setEmail("admin@iplteams.com");
                    admin.setPasswordHash(passwordEncoder.encode("admin123"));
                    admin.setRole(User.Role.ADMIN);
                    User savedAdmin = userRepository.save(admin);
                    System.out.println("✓ Created default admin user: admin/admin123 (ID: " + savedAdmin.getId() + ")");
                } else {
                    System.out.println("Admin user already exists");
                }

                // Create test admin user if not exists
                if (!userRepository.existsByUsername("testadmin")) {
                    User testAdmin = new User();
                    testAdmin.setUsername("testadmin");
                    testAdmin.setEmail("testadmin@iplteams.com");
                    testAdmin.setPasswordHash(passwordEncoder.encode("admin123"));
                    testAdmin.setRole(User.Role.ADMIN);
                    User savedTestAdmin = userRepository.save(testAdmin);
                    System.out.println("✓ Created test admin user: testadmin/admin123 (ID: " + savedTestAdmin.getId() + ")");
                } else {
                    System.out.println("Test admin user already exists");
                }

                // Create regular user if not exists
                if (!userRepository.existsByUsername("user")) {
                    User user = new User();
                    user.setUsername("user");
                    user.setEmail("user@iplteams.com");
                    user.setPasswordHash(passwordEncoder.encode("user123"));
                    user.setRole(User.Role.PLAYER);
                    User savedUser = userRepository.save(user);
                    System.out.println("✓ Created default user: user/user123 (ID: " + savedUser.getId() + ")");
                } else {
                    System.out.println("Regular user already exists");
                }
                
                // Final count check
                long finalUserCount = userRepository.count();
                System.out.println("Final user count in database: " + finalUserCount);
                System.out.println("=== DataLoader: Database initialization completed ===");
                
            } catch (Exception e) {
                System.err.println("ERROR in DataLoader: " + e.getMessage());
                e.printStackTrace();
            }
        };
    }
}