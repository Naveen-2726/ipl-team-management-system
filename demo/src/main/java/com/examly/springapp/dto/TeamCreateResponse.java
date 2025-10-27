package com.examly.springapp.dto;

public class TeamCreateResponse {
    private Long teamId;
    private String teamName;

    public TeamCreateResponse() {}

    public TeamCreateResponse(Long teamId, String teamName) {
        this.teamId = teamId;
        this.teamName = teamName;
    }

    public Long getTeamId() { return teamId; }
    public void setTeamId(Long teamId) { this.teamId = teamId; }

    public String getTeamName() { return teamName; }
    public void setTeamName(String teamName) { this.teamName = teamName; }
}
