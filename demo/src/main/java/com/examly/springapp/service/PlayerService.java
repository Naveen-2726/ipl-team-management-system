package com.examly.springapp.service;

import com.examly.springapp.entity.Player;
import com.examly.springapp.entity.Team;
import com.examly.springapp.repository.PlayerRepository;
import com.examly.springapp.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; // pagination //this
import org.springframework.data.domain.Pageable; // pagination //this
import org.springframework.stereotype.Service;
// import java.util.List; // removed after adding pagination //this
import java.util.Optional;

@Service
public class PlayerService    {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private TeamRepository teamRepository;

    public Player addPlayer(String playerName, String role, Integer age, Long teamId) {
        // Validate input parameters
        if (playerName == null || playerName.trim().isEmpty()) {
            throw new RuntimeException("Player name cannot be empty");
        }
        if (role == null || role.trim().isEmpty()) {
            throw new RuntimeException("Player role cannot be empty");
        }
        if (age == null || age < 10 || age > 60) {
            throw new RuntimeException("Player age must be between 10 and 60");
        }
        
        try {
            Player player = new Player();
            player.setPlayerName(playerName.trim());
            player.setRole(role.trim());
            player.setAge(age);
            
            if (teamId != null) {
                Team team = teamRepository.findById(teamId)
                    .orElseThrow(() -> new RuntimeException("Team with ID " + teamId + " not found"));
                player.setTeam(team);
            }
            
            return playerRepository.save(player);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save player: " + e.getMessage(), e);
        }
    }

    public Page<Player> getAllPlayers(Pageable pageable) { // pagination //this
        return playerRepository.findAll(pageable);
    }

    public Optional<Player> getPlayerById(Long id) {
        return playerRepository.findById(id);
    }

    public Player updatePlayer(Long id, String playerName, String role, Integer age, Long teamId) {
        Player player = playerRepository.findById(id).orElseThrow(() -> new RuntimeException("Player not found"));
        if (playerName != null) player.setPlayerName(playerName);
        if (role != null) player.setRole(role);
        if (age != null) player.setAge(age);
        if (teamId != null) {
            Team team = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Team not found"));
            player.setTeam(team);
        }
        return playerRepository.save(player);
    }

    public boolean deletePlayer(Long id) {
        if (playerRepository.existsById(id)) {
            playerRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Page<Player> getPlayersByTeam(Long teamId, Pageable pageable) { // pagination //this
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Team not found"));
        return playerRepository.findByTeam(team, pageable);
    }

    public long getPlayerCount() {
        return playerRepository.count();
    }
}