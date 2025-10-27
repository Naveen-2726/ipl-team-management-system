package com.examly.springapp.controller;

import com.examly.springapp.entity.Squad;
import com.examly.springapp.service.SquadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; //this
import org.springframework.data.domain.Pageable; //this
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/squads")
@Tag(name = "Squad Management", description = "APIs for managing squads (read-only MVP)") //this
@CrossOrigin(origins = "*")
public class SquadController { //this

    @Autowired private SquadService service; //this

    @GetMapping
    @Operation(summary = "List squads (paged)", description = "Use page,size,sort for pagination & sorting. Filter by optional teamId and status (ACTIVE, INACTIVE, SUSPENDED). You can pass multiple sort parameters, e.g., sort=status,asc&sort=id,desc.")
    public ResponseEntity<Page<Squad>> list(
            @Parameter(description = "Filter by Team ID", example = "1")
            @RequestParam(required = false) Long teamId,
            @Parameter(description = "Filter by squad status", schema = @Schema(allowableValues = {"ACTIVE", "INACTIVE", "SUSPENDED"}))
            @RequestParam(required = false) Squad.Status status,
            @ParameterObject Pageable pageable) { //this
        return ResponseEntity.ok(service.findByFilters(teamId, status, pageable));
    }
}
