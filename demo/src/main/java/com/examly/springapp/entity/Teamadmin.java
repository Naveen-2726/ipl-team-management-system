package com.examly.springapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "TEAMADMIN")
public class Teamadmin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public enum Role {
        ADMIN, PLAYER
    }

    @Enumerated(EnumType.STRING)
    private Role role;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}