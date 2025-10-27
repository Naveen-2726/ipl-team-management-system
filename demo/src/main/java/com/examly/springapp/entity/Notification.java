package com.examly.springapp.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "NOTIFICATIONS") //this
public class Notification { //this
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //this

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // recipient //this

    @Column(columnDefinition = "TEXT")
    private String message; //this

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Type type = Type.IN_APP; // EMAIL/SMS/IN_APP //this

    private boolean isRead = false; //this

    private LocalDateTime createdDate = LocalDateTime.now(); //this

    @Column(length = 20)
    private String priority = "NORMAL"; // LOW/NORMAL/HIGH //this

    public enum Type { EMAIL, SMS, IN_APP } //this

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Type getType() { return type; }
    public void setType(Type type) { this.type = type; }
    public boolean isRead() { return isRead; }
    public void setRead(boolean read) { isRead = read; }
    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}
