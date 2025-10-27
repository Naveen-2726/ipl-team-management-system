package com.examly.springapp.controller;

import com.examly.springapp.entity.Team;
import com.examly.springapp.dto.TeamDTO;
import com.examly.springapp.service.TeamService;
import com.examly.springapp.dto.TeamCreateResponse;
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
@RequestMapping("/teams")
@Tag(name = "🏆 Team Management", description = "🏏 IPL team creation, management and organization system")
@CrossOrigin(origins = "*")
public class TeamController {

    @Autowired
    private TeamService teamService;

    @GetMapping
    @Operation(summary = "📋 List All Teams", description = "Get paginated list of all IPL teams in the system")
    public ResponseEntity<Page<Team>> getAllTeams(Pageable pageable) { // pagination //this
        return ResponseEntity.ok(teamService.getAllTeams(pageable));
    }

    @PostMapping
    @Operation(summary = "➕ Create New Team", description = "Register a new IPL team with logo in the management system")
    public ResponseEntity<?> createTeam(@RequestBody TeamDTO dto) {
        try {
            Team createdTeam = teamService.createTeam(dto.getTeamName(), dto.getLogoUrl());
            return ResponseEntity.ok(new TeamCreateResponse(createdTeam.getId(), createdTeam.getTeamName()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/add")
    @Operation(summary = "➕ Add Team (Alternative)", description = "Alternative endpoint to create a new IPL team")
    public ResponseEntity<?> createTeamAlias(@RequestBody TeamDTO dto) {
        return createTeam(dto);
    }

    @GetMapping("/{id}")
    @Operation(summary = "🔍 Get Team Details", description = "Retrieve detailed information of a specific team by ID")
    public ResponseEntity<?> getTeamById(@PathVariable Long id) {
        Optional<Team> team = teamService.getTeamById(id);
        return team.<ResponseEntity<?>>map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Operation(summary = "✏️ Update Team", description = "Modify existing team information and logo")
    public ResponseEntity<?> updateTeam(@PathVariable Long id, @RequestBody TeamDTO dto) {
        try {
            Team temp = new Team();
            temp.setTeamName(dto.getTeamName());

            Team updatedTeam = teamService.updateTeam(id, temp);
            if (updatedTeam != null) {
                return ResponseEntity.ok(updatedTeam);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "🗑️ Remove Team", description = "Delete team from the IPL management system")
    public ResponseEntity<?> deleteTeam(@PathVariable Long id) {
        return teamService.deleteTeam(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/api/teams/count")
    @Operation(summary = "📊 Team Statistics", description = "Get total count of registered teams in the system")
    public ResponseEntity<?> getTeamsCount() {
        try {
            long count = teamService.getTeamCount();
            return ResponseEntity.ok(java.util.Map.of("count", count));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting team count: " + e.getMessage());
        }
    }


}
