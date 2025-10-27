package com.examly.springapp.repository;

import com.examly.springapp.entity.Player;
import com.examly.springapp.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page; // pagination //this
import org.springframework.data.domain.Pageable; // pagination //this
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
    List<Player> findByTeam(Team team);
    Page<Player> findByTeam(Team team, Pageable pageable); // pagination //this
}