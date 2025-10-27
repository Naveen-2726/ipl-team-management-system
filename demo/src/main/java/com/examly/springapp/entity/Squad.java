package com.examly.springapp.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "SQUADS") //this
public class Squad { //this
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; //this

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team; //this

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner; //this

    @Lob
    @Column(name = "composition")
    private String composition; // JSON/text describing roles/positions //this

    private LocalDate establishmentDate; //this

    @Enumerated(EnumType.STRING)
    @Column(length = 30)
    private Status status = Status.ACTIVE; //this

    public enum Status { ACTIVE, INACTIVE, SUSPENDED } //this

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Team getTeam() { return team; }
    public void setTeam(Team team) { this.team = team; }
    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }
    public String getComposition() { return composition; }
    public void setComposition(String composition) { this.composition = composition; }
    public LocalDate getEstablishmentDate() { return establishmentDate; }
    public void setEstablishmentDate(LocalDate establishmentDate) { this.establishmentDate = establishmentDate; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}
