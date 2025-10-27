package com.examly.springapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

@Entity
@Table(name = "players")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Player name is required")
    @Size(max = 100)
    @Column(name = "player_name", nullable = false)
    private String playerName;

    @Column(name = "age")
    private Integer age;

    @Column(name = "nationality")
    private String nationality = "India";

    @NotBlank(message = "Role is required")
    @Size(max = 50)
    private String role;

    @ManyToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "matches_played")
    private Integer matchesPlayed = 0;

    @Column(name = "runs_scored")
    private Integer runsScored = 0;

    @Column(name = "wickets_taken")
    private Integer wicketsTaken = 0;

    @Column(name = "batting_average")
    private BigDecimal battingAverage = BigDecimal.ZERO;

    @Column(name = "strike_rate")
    private BigDecimal strikeRate = BigDecimal.ZERO;

    @Column(name = "price_crores")
    private BigDecimal priceCrores;

    public Player() {}
    public Player(String playerName, String role, Integer age) {
        this.playerName = playerName;
        this.role = role;
        this.age = age;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    
    public String getNationality() { return nationality; }
    public void setNationality(String nationality) { this.nationality = nationality; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public Team getTeam() { return team; }
    public void setTeam(Team team) { this.team = team; }
    
    public Integer getMatchesPlayed() { return matchesPlayed; }
    public void setMatchesPlayed(Integer matchesPlayed) { this.matchesPlayed = matchesPlayed; }
    
    public Integer getRunsScored() { return runsScored; }
    public void setRunsScored(Integer runsScored) { this.runsScored = runsScored; }
    
    public Integer getWicketsTaken() { return wicketsTaken; }
    public void setWicketsTaken(Integer wicketsTaken) { this.wicketsTaken = wicketsTaken; }
    
    public BigDecimal getBattingAverage() { return battingAverage; }
    public void setBattingAverage(BigDecimal battingAverage) { this.battingAverage = battingAverage; }
    
    public BigDecimal getStrikeRate() { return strikeRate; }
    public void setStrikeRate(BigDecimal strikeRate) { this.strikeRate = strikeRate; }
    
    public BigDecimal getPriceCrores() { return priceCrores; }
    public void setPriceCrores(BigDecimal priceCrores) { this.priceCrores = priceCrores; }
}
