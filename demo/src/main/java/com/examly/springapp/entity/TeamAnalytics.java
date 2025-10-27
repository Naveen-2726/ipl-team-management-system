package com.examly.springapp.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "TEAM_ANALYTICS") //this
public class TeamAnalytics { //this
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //this

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team; //this

    @Column(length = 100, nullable = false)
    private String metricType; // e.g., WIN_RATE, AVG_SCORE //this

    @Column(precision = 18, scale = 4)
    private BigDecimal value; // metric value //this

    private LocalDate date; // metric date //this

    @Column(length = 100)
    private String category; // optional grouping //this

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Team getTeam() { return team; }
    public void setTeam(Team team) { this.team = team; }
    public String getMetricType() { return metricType; }
    public void setMetricType(String metricType) { this.metricType = metricType; }
    public BigDecimal getValue() { return value; }
    public void setValue(BigDecimal value) { this.value = value; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
}
