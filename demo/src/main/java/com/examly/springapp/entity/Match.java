package com.examly.springapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "MATCHES")
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Team A name is required")
    @Column(name = "team_a_name", nullable = false)
    private String teamAName;

    @NotBlank(message = "Team B name is required")
    @Column(name = "team_b_name", nullable = false)
    private String teamBName;

    @NotBlank(message = "Venue is required")
    @Column(nullable = false)
    private String venue;

    @NotNull(message = "Match date is required")
    @Column(name = "match_date", nullable = false)
    private LocalDateTime matchDate;

    // Constructors
    public Match() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTeamAName() { return teamAName; }
    public void setTeamAName(String teamAName) { this.teamAName = teamAName; }

    public String getTeamBName() { return teamBName; }
    public void setTeamBName(String teamBName) { this.teamBName = teamBName; }

    public String getVenue() { return venue; }
    public void setVenue(String venue) { this.venue = venue; }

    public LocalDateTime getMatchDate() { return matchDate; }
    public void setMatchDate(LocalDateTime matchDate) { this.matchDate = matchDate; }
}