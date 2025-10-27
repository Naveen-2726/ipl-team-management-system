package com.examly.springapp.controller;

import com.examly.springapp.entity.Evaluation;
import com.examly.springapp.service.EvaluationService;
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
@RequestMapping("/evaluations")
@Tag(name = "Evaluation Management", description = "APIs for player evaluations")
@CrossOrigin(origins = "*")
public class EvaluationController {

    @Autowired
    private EvaluationService evaluationService;

    @PostMapping
    @Operation(summary = "Create evaluation")
    public ResponseEntity<?> create(@RequestBody Evaluation evaluation) {
        try { return ResponseEntity.ok(evaluationService.create(evaluation)); }
        catch (Exception e) { return ResponseEntity.badRequest().body(e.getMessage()); }
    }

    @GetMapping
    @Operation(summary = "List evaluations (paged)")
    public ResponseEntity<Page<Evaluation>> list(Pageable pageable) { // pagination //this
        return ResponseEntity.ok(evaluationService.findAll(pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get evaluation by id")
    public ResponseEntity<?> get(@PathVariable Long id) {
        Optional<Evaluation> e = evaluationService.findById(id);
        return e.<ResponseEntity<?>>map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update evaluation")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Evaluation evaluation) {
        Evaluation updated = evaluationService.update(id, evaluation);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete evaluation")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return evaluationService.delete(id) ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
