package com.examly.springapp.controller;

import com.examly.springapp.entity.AuditLog;
import com.examly.springapp.service.AuditLogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; //this
import org.springframework.data.domain.Pageable; //this
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/audit-logs")
@Tag(name = "Audit Logs", description = "Admin APIs for audit logs (read-only MVP)") //this
@CrossOrigin(origins = "*")
public class AuditLogController { //this

    @Autowired private AuditLogService service; //this

    @GetMapping
    @Operation(summary = "List audit logs (paged)")
    public ResponseEntity<Page<AuditLog>> list(Pageable pageable) { //this
        return ResponseEntity.ok(service.findAll(pageable));
    }
}
