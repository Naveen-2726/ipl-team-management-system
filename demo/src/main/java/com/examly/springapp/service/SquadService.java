package com.examly.springapp.service;

import com.examly.springapp.entity.Squad;
import com.examly.springapp.repository.SquadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; //this
import org.springframework.data.domain.Pageable; //this
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service //this
public class SquadService { //this
    @Autowired private SquadRepository repo; //this

    public Page<Squad> findAll(Pageable pageable) { return repo.findAll(pageable); } //this
    public Optional<Squad> findById(Long id) { return repo.findById(id); } //this

    public Page<Squad> findByFilters(Long teamId, Squad.Status status, Pageable pageable) {
        if (teamId != null && status != null) {
            return repo.findByTeam_IdAndStatus(teamId, status, pageable);
        } else if (teamId != null) {
            return repo.findByTeam_Id(teamId, pageable);
        } else if (status != null) {
            return repo.findByStatus(status, pageable);
        } else {
            return repo.findAll(pageable);
        }
    }
}
