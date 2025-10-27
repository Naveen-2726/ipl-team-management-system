package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.repository.PlayerRepository;
import com.examly.springapp.repository.TeamRepository;
import com.examly.springapp.repository.MatchRepository;
import com.examly.springapp.repository.UserRepository;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/stats")
    public ResponseEntity<?> getDashboardStats() {
        try {
            Map<String, Object> stats = new HashMap<>();
            stats.put("totalPlayers", playerRepository.count());
            stats.put("totalTeams", teamRepository.count());
            stats.put("totalMatches", matchRepository.count());
            stats.put("totalUsers", userRepository.count());
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching stats: " + e.getMessage());
        }
    }

    @GetMapping("/recent-activities")
    public ResponseEntity<?> getRecentActivities() {
        try {
            List<Map<String, Object>> activities = new ArrayList<>();
            
            // Sample activities - In a real system, you'd fetch from audit logs
            Map<String, Object> activity1 = new HashMap<>();
            activity1.put("action", "New player added: Virat Kohli");
            activity1.put("time", "2 hours ago");
            activity1.put("icon", "Users");
            activities.add(activity1);

            Map<String, Object> activity2 = new HashMap<>();
            activity2.put("action", "Match scheduled: RCB vs MI");
            activity2.put("time", "4 hours ago");
            activity2.put("icon", "Calendar");
            activities.add(activity2);

            Map<String, Object> activity3 = new HashMap<>();
            activity3.put("action", "Team updated: Chennai Super Kings");
            activity3.put("time", "1 day ago");
            activity3.put("icon", "Trophy");
            activities.add(activity3);

            return ResponseEntity.ok(Map.of("data", activities));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching activities: " + e.getMessage());
        }
    }

    @GetMapping("/system-alerts")
    public ResponseEntity<?> getSystemAlerts() {
        try {
            List<Map<String, Object>> alerts = new ArrayList<>();
            
            // Sample alerts - In a real system, you'd have actual monitoring
            Map<String, Object> alert1 = new HashMap<>();
            alert1.put("title", "Database Connection");
            alert1.put("message", "Database performance is optimal");
            alert1.put("level", "info");
            alert1.put("time", "Just now");
            alerts.add(alert1);

            return ResponseEntity.ok(Map.of("data", alerts));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching alerts: " + e.getMessage());
        }
    }

    @GetMapping("/system-health")
    public ResponseEntity<?> getSystemHealth() {
        try {
            Map<String, Object> health = new HashMap<>();
            health.put("status", "healthy");
            health.put("uptime", "99.9%");
            health.put("lastBackup", LocalDateTime.now().minusHours(2).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            health.put("activeUsers", userRepository.count());
            
            return ResponseEntity.ok(health);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error checking system health: " + e.getMessage());
        }
    }
}