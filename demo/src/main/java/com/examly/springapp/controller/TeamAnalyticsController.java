package com.examly.springapp.controller;

import com.examly.springapp.entity.TeamAnalytics;
import com.examly.springapp.service.TeamAnalyticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; //this
import org.springframework.data.domain.Pageable; //this
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/analytics/teams")
@Tag(name = "Team Analytics", description = "APIs for team analytics (read-only MVP)") //this
@CrossOrigin(origins = "*")
public class TeamAnalyticsController { //this

    @Autowired private TeamAnalyticsService service; //this

    @GetMapping
    @Operation(summary = "List team analytics (paged)")
    public ResponseEntity<Page<TeamAnalytics>> list(Pageable pageable) { //this
        return ResponseEntity.ok(service.findAll(pageable));
    }
}
