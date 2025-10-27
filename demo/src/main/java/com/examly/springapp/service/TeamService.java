package com.examly.springapp.service;

import com.examly.springapp.entity.Team;
import com.examly.springapp.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; // pagination //this
import org.springframework.data.domain.Pageable; // pagination //this
import org.springframework.stereotype.Service;
// import java.util.List; // removed after adding pagination //this
import java.util.Optional;

@Service
public class TeamService {

    @Autowired
    private TeamRepository teamRepository;

    public Team createTeam(String teamName) {
        return createTeam(teamName, null);
    }
    
    public Team createTeam(String teamName, String logoUrl) {
        if (teamRepository.existsByTeamName(teamName)) {
            throw new RuntimeException("Team name already exists");
        }

        Team team = new Team();
        team.setTeamName(teamName);
        return teamRepository.save(team);
    }

    public Page<Team> getAllTeams(Pageable pageable) { // pagination //this
        return teamRepository.findAll(pageable);
    }

    public Optional<Team> getTeamById(Long id) {
        return teamRepository.findById(id);
    }

    public Team updateTeam(Long id, Team teamDetails) {
        Optional<Team> existingTeam = teamRepository.findById(id);
        if (existingTeam.isPresent()) {
            Team team = existingTeam.get();
            team.setTeamName(teamDetails.getTeamName());
            return teamRepository.save(team);
        }
        return null;
    }

    public boolean deleteTeam(Long id) {
        if (teamRepository.existsById(id)) {
            teamRepository.deleteById(id);
            return true;
        }
        return false;
    }



    public long getTeamCount() {
        return teamRepository.count();
    }
}