package com.examly.springapp.dto;

import jakarta.validation.constraints.*;

public class PlayerUpdateDTO {
    @NotBlank(message = "Player name is required")
    @Size(max = 100)
    private String playerName;

    @NotBlank(message = "Role is required")
    @Size(max = 50)
    private String role;

    @Min(10)
    @Max(60)
    private Integer age;

    private Long teamId; // optional

    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public Long getTeamId() { return teamId; }
    public void setTeamId(Long teamId) { this.teamId = teamId; }
}
