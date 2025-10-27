package com.examly.springapp.dto;

import com.examly.springapp.entity.Teamadmin;

public class UserRegisterDTO {
    private String username;
    private String email;
    private String password;
    private Teamadmin teamadmin;
    private Teamadmin.Role role;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Teamadmin getTeamadmin() { return teamadmin; }
    public void setTeamadmin(Teamadmin teamadmin) { this.teamadmin = teamadmin; }
    public Teamadmin.Role getRole() { return role; }
    public void setRole(Teamadmin.Role role) { this.role = role; }
}