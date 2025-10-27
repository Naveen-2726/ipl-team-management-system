package com.examly.springapp.controller;

import com.examly.springapp.dto.CurrentUserDTO;
import com.examly.springapp.dto.LoginRequest;
import com.examly.springapp.entity.User;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.UserService;
import com.examly.springapp.config.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.authenticate(loginRequest.getUsernameOrEmail(), loginRequest.getPassword());
            if (user != null) {
                String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
                return ResponseEntity.ok(Map.of(
                        "token", token,
                        "username", user.getUsername(),
                        "role", user.getRole().name()
                ));
            }
            return ResponseEntity.badRequest().body("Invalid credentials");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user) {
        try {
            // Pre-check duplicates for clearer error messages
            if (user.getUsername() != null && userService.existsByUsername(user.getUsername())) {
                return ResponseEntity.status(409).body(Map.of("error", "Username already exists"));
            }
            if (user.getEmail() != null && userService.existsByEmail(user.getEmail())) {
                return ResponseEntity.status(409).body(Map.of("error", "Email already exists"));
            }
            User savedUser = userService.createUser(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> me() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || "anonymousUser".equals(auth.getPrincipal())) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        String username = auth.getName();
        return userRepository.findByUsername(username)
                .<ResponseEntity<?>>map(u -> ResponseEntity.ok(new CurrentUserDTO(u.getId(), u.getUsername(), u.getEmail(), u.getRole().name())))
                .orElse(ResponseEntity.status(404).body(Map.of("error", "User not found")));
    }

    @GetMapping("/api/users/count")
    public ResponseEntity<?> getUsersCount() {
        try {
            long count = userRepository.count();
            return ResponseEntity.ok(Map.of("count", count));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting user count: " + e.getMessage());
        }
    }
}