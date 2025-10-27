package com.examly.springapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "EVALUATIONS")
public class Evaluation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Player ID is required")
    @Column(name = "player_id", nullable = false)
    private Long playerId;

    @NotNull(message = "Evaluator ID is required")
    @Column(name = "evaluator_id", nullable = false)
    private Long evaluatorId;

    @NotNull(message = "Team ID is required")
    @Column(name = "team_id", nullable = false)
    private Long teamId;

    @Min(value = 0, message = "Score must be between 0 and 100")
    @Max(value = 100, message = "Score must be between 0 and 100")
    private Integer score;

    @Column(name = "evaluation_date")
    private LocalDateTime evaluationDate = LocalDateTime.now();

    // Constructors
    public Evaluation() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getPlayerId() { return playerId; }
    public void setPlayerId(Long playerId) { this.playerId = playerId; }

    public Long getEvaluatorId() { return evaluatorId; }
    public void setEvaluatorId(Long evaluatorId) { this.evaluatorId = evaluatorId; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public LocalDateTime getEvaluationDate() { return evaluationDate; }
    public void setEvaluationDate(LocalDateTime evaluationDate) { this.evaluationDate = evaluationDate; }

    public Long getTeamId() { return teamId; }
    public void setTeamId(Long teamId) { this.teamId = teamId; }
}