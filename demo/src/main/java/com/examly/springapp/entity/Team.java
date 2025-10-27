package com.examly.springapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "teams")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Team name is required")
    @Size(max = 100)
    @Column(name = "team_name", unique = true, nullable = false)
    private String teamName;

    @Column(name = "short_name")
    private String shortName;

    @Column(name = "city")
    private String city;

    @Column(name = "founded_year")
    private Integer foundedYear;

    @Column(name = "captain")
    private String captain;

    @Column(name = "coach")
    private String coach;

    @Column(name = "home_ground")
    private String homeGround;

    @Column(name = "owner")
    private String owner;

    @Column(name = "titles_won")
    private Integer titlesWon = 0;

    @Column(name = "matches_played")
    private Integer matchesPlayed = 0;

    @Column(name = "matches_won")
    private Integer matchesWon = 0;

    @Column(name = "points")
    private Integer points = 0;

    // Constructors
    public Team() {}

    public Team(String teamName) {
        this.teamName = teamName;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTeamName() { return teamName; }
    public void setTeamName(String teamName) { this.teamName = teamName; }

    public String getShortName() { return shortName; }
    public void setShortName(String shortName) { this.shortName = shortName; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public Integer getFoundedYear() { return foundedYear; }
    public void setFoundedYear(Integer foundedYear) { this.foundedYear = foundedYear; }

    public String getCaptain() { return captain; }
    public void setCaptain(String captain) { this.captain = captain; }

    public String getCoach() { return coach; }
    public void setCoach(String coach) { this.coach = coach; }

    public String getHomeGround() { return homeGround; }
    public void setHomeGround(String homeGround) { this.homeGround = homeGround; }

    public String getOwner() { return owner; }
    public void setOwner(String owner) { this.owner = owner; }

    public Integer getTitlesWon() { return titlesWon; }
    public void setTitlesWon(Integer titlesWon) { this.titlesWon = titlesWon; }

    public Integer getMatchesPlayed() { return matchesPlayed; }
    public void setMatchesPlayed(Integer matchesPlayed) { this.matchesPlayed = matchesPlayed; }

    public Integer getMatchesWon() { return matchesWon; }
    public void setMatchesWon(Integer matchesWon) { this.matchesWon = matchesWon; }

    public Integer getPoints() { return points; }
    public void setPoints(Integer points) { this.points = points; }
}