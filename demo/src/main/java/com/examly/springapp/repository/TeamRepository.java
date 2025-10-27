package com.examly.springapp.repository;

import com.examly.springapp.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findByTeamName(String teamName);
    boolean existsByTeamName(String teamName);
    java.util.List<Team> findByTeamNameContainingIgnoreCase(String teamName);
}