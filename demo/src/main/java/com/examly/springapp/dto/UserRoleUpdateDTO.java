package com.examly.springapp.dto;

import com.examly.springapp.entity.User;

public class UserRoleUpdateDTO {
    private User.Role role;

    public User.Role getRole() { return role; }
    public void setRole(User.Role role) { this.role = role; }
}
