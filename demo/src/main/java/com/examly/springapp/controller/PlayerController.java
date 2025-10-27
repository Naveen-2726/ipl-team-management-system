package com.examly.springapp.controller;

import com.examly.springapp.entity.Player;
import com.examly.springapp.service.PlayerService;
import com.examly.springapp.dto.PlayerCreateDTO;
import com.examly.springapp.dto.PlayerUpdateDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; // pagination //this
import org.springframework.data.domain.Pageable; // pagination //this
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// import java.util.List; // removed after adding pagination //this
import java.util.Optional;

@RestController
@Tag(name = "⚽ Player Management", description = "🏏 Complete player registration and management system for IPL teams")
@CrossOrigin(origins = "*")
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @PostMapping("/players/add")
    @Operation(summary = "➕ Add New Player", description = "Register a new player to the IPL team management system")
    public ResponseEntity<?> addPlayer(@RequestBody PlayerCreateDTO dto) {
        try {
            Player player = playerService.addPlayer(dto.getPlayerName(), dto.getRole(), dto.getAge(), dto.getTeamId());
            
            
            return ResponseEntity.ok(player);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/players")
    @Operation(summary = "📋 List All Players", description = "Retrieve paginated list of all registered players")
    public ResponseEntity<Page<Player>> listPlayers(Pageable pageable) { // pagination //this
        return ResponseEntity.ok(playerService.getAllPlayers(pageable));
    }

    @GetMapping("/players/{id}")
    @Operation(summary = "👤 Get Player Details", description = "Fetch detailed information of a specific player by ID")
    public ResponseEntity<?> getPlayerById(@PathVariable Long id) {
        Optional<Player> player = playerService.getPlayerById(id);
        if (player.isPresent()) {
            return ResponseEntity.ok(player.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/players/{id}")
    @Operation(summary = "✏️ Update Player", description = "Modify existing player information and team assignment")
    public ResponseEntity<?> updatePlayer(@PathVariable Long id, @RequestBody PlayerUpdateDTO dto) {
        try {
            Player updatedPlayer = playerService.updatePlayer(id, dto.getPlayerName(), dto.getRole(), dto.getAge(), dto.getTeamId());
            
            
            return ResponseEntity.ok(updatedPlayer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/players/{id}")
    @Operation(summary = "🗑️ Remove Player", description = "Delete player registration from the system")
    public ResponseEntity<?> deletePlayer(@PathVariable Long id) {
        boolean deleted = playerService.deletePlayer(id);
        if (deleted) {
            
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/players/team/{teamId}")
    @Operation(summary = "🏆 Team Players", description = "Get all players belonging to a specific team with pagination")
    public ResponseEntity<Page<Player>> getPlayersByTeam(@PathVariable Long teamId, Pageable pageable) { // pagination //this
        return ResponseEntity.ok(playerService.getPlayersByTeam(teamId, pageable));
    }

    @GetMapping("/api/players/count")
    @Operation(summary = "📊 Player Statistics", description = "Get total count of registered players in the system")
    public ResponseEntity<?> getPlayersCount() {
        try {
            long count = playerService.getPlayerCount();
            return ResponseEntity.ok(java.util.Map.of("count", count));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting player count: " + e.getMessage());
        }
    }

    @PostMapping("/players/test")
    @Operation(summary = "🧪 Test Player Creation", description = "Test endpoint for debugging player creation")
    public ResponseEntity<?> testAddPlayer(@RequestBody java.util.Map<String, Object> payload) {
        try {
            System.out.println("Received payload: " + payload);
            
            String playerName = (String) payload.get("playerName");
            String role = (String) payload.get("role");
            Object ageObj = payload.get("age");
            Object teamIdObj = payload.get("teamId");
            
            Integer age = null;
            if (ageObj != null) {
                if (ageObj instanceof Integer) {
                    age = (Integer) ageObj;
                } else if (ageObj instanceof String) {
                    age = Integer.parseInt((String) ageObj);
                }
            }
            
            Long teamId = null;
            if (teamIdObj != null) {
                if (teamIdObj instanceof Long) {
                    teamId = (Long) teamIdObj;
                } else if (teamIdObj instanceof Integer) {
                    teamId = ((Integer) teamIdObj).longValue();
                } else if (teamIdObj instanceof String) {
                    teamId = Long.parseLong((String) teamIdObj);
                }
            }
            
            Player player = playerService.addPlayer(playerName, role, age, teamId);
            return ResponseEntity.ok(java.util.Map.of(
                "success", true,
                "message", "Player created successfully",
                "player", player
            ));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(java.util.Map.of(
                "success", false,
                "error", e.getMessage(),
                "details", e.getClass().getSimpleName()
            ));
        }
    }
}