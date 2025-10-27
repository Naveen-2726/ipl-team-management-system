package com.examly.springapp.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "AUDIT_LOGS") //this
public class AuditLog { //this
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //this

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // actor //this

    @Column(length = 100)
    private String action; // e.g., CREATE_PLAYER //this

    @Column(length = 100)
    private String entityType; // PLAYER/TEAM/MATCH/EVALUATION //this

    private Long entityId; // target id //this

    @Lob
    private String oldValue; // JSON //this

    @Lob
    private String newValue; // JSON //this

    private LocalDateTime timestamp = LocalDateTime.now(); //this

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getEntityType() { return entityType; }
    public void setEntityType(String entityType) { this.entityType = entityType; }
    public Long getEntityId() { return entityId; }
    public void setEntityId(Long entityId) { this.entityId = entityId; }
    public String getOldValue() { return oldValue; }
    public void setOldValue(String oldValue) { this.oldValue = oldValue; }
    public String getNewValue() { return newValue; }
    public void setNewValue(String newValue) { this.newValue = newValue; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
