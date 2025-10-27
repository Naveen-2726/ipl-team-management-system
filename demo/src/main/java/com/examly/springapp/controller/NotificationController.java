package com.examly.springapp.controller;

import com.examly.springapp.entity.Notification;
import com.examly.springapp.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; //this
import org.springframework.data.domain.Pageable; //this
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/notifications")
@Tag(name = "Notification Management", description = "APIs for notifications (read-only MVP)") //this
@CrossOrigin(origins = "*")
public class NotificationController { //this

    @Autowired private NotificationService service; //this

    @GetMapping
    @Operation(summary = "List notifications (paged)")
    public ResponseEntity<Page<Notification>> list(Pageable pageable) { //this
        return ResponseEntity.ok(service.findAll(pageable));
    }
}
