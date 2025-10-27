package com.examly.springapp.service;

import com.examly.springapp.entity.Match;
import com.examly.springapp.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; // pagination //this
import org.springframework.data.domain.Pageable; // pagination //this
import org.springframework.stereotype.Service;

// import java.util.List; // removed after adding pagination //this
import java.util.Optional;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    public Match create(Match match) { return matchRepository.save(match); }

    public Page<Match> findAll(Pageable pageable) { return matchRepository.findAll(pageable); } // pagination //this

    public Optional<Match> findById(Long id) { return matchRepository.findById(id); }

    public Match update(Long id, Match details) {
        return matchRepository.findById(id)
                .map(existing -> {
                    existing.setTeamAName(details.getTeamAName());
                    existing.setTeamBName(details.getTeamBName());
                    existing.setVenue(details.getVenue());
                    existing.setMatchDate(details.getMatchDate());
                    return matchRepository.save(existing);
                })
                .orElse(null);
    }

    public boolean delete(Long id) {
        if (matchRepository.existsById(id)) { matchRepository.deleteById(id); return true; }
        return false;
    }

    public long getMatchCount() {
        return matchRepository.count();
    }
}
