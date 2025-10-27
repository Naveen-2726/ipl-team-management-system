package com.examly.springapp.controller;

import com.examly.springapp.entity.Match;
import com.examly.springapp.service.MatchService;
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
@RequestMapping("/matches")
@Tag(name = "🏈 Match Management", description = "⚽ IPL match scheduling, tracking and management system")
@CrossOrigin(origins = "*")
public class MatchController {

    @Autowired
    private MatchService matchService;

    @PostMapping
    @Operation(summary = "➕ Schedule Match", description = "Create and schedule a new IPL match between teams")
    public ResponseEntity<?> create(@RequestBody Match match) {
        try { return ResponseEntity.ok(matchService.create(match)); }
        catch (Exception e) { return ResponseEntity.badRequest().body(e.getMessage()); }
    }

    @GetMapping
    @Operation(summary = "📋 List All Matches", description = "Get paginated list of all scheduled IPL matches")
    public ResponseEntity<Page<Match>> list(Pageable pageable) { // pagination //this
        return ResponseEntity.ok(matchService.findAll(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "🔍 Match Details", description = "Retrieve detailed information of a specific match by ID")
    public ResponseEntity<?> get(@PathVariable Long id) {
        Optional<Match> m = matchService.findById(id);
        return m.<ResponseEntity<?>>map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Operation(summary = "✏️ Update Match", description = "Modify match details, schedule or results")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Match match) {
        Match updated = matchService.update(id, match);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "🗑️ Cancel Match", description = "Remove or cancel a scheduled match from the system")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return matchService.delete(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @GetMapping("/api/matches/count")
    @Operation(summary = "📊 Match Statistics", description = "Get total count of scheduled matches in the system")
    public ResponseEntity<?> getMatchesCount() {
        try {
            long count = matchService.getMatchCount();
            return ResponseEntity.ok(java.util.Map.of("count", count));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error getting match count: " + e.getMessage());
        }
    }
}
