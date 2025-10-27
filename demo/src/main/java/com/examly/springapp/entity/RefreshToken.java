package com.examly.springapp.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "REFRESH_TOKENS") //this
public class RefreshToken { //this
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //this

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user; //this

    @Column(nullable = false, unique = true, length = 255)
    private String tokenHash; // store hashed token //this

    private LocalDateTime createdDate = LocalDateTime.now(); //this
    private LocalDateTime expiryDate; //this

    private boolean isActive = true; //this

    @Column(length = 255)
    private String userAgent; // optional metadata //this

    @Column(length = 100)
    private String ipAddress; // optional metadata //this

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getTokenHash() { return tokenHash; }
    public void setTokenHash(String tokenHash) { this.tokenHash = tokenHash; }
    public LocalDateTime getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDateTime createdDate) { this.createdDate = createdDate; }
    public LocalDateTime getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDateTime expiryDate) { this.expiryDate = expiryDate; }
    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
}
