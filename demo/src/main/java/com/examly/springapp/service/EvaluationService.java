package com.examly.springapp.service;

import com.examly.springapp.entity.Evaluation;
import com.examly.springapp.repository.EvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; // pagination //this
import org.springframework.data.domain.Pageable; // pagination //this
import org.springframework.stereotype.Service;

// import java.util.List; // removed after adding pagination //this
import java.util.Optional;

@Service
public class EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;

    public Evaluation create(Evaluation evaluation) { return evaluationRepository.save(evaluation); }

    public Page<Evaluation> findAll(Pageable pageable) { return evaluationRepository.findAll(pageable); } // pagination //this

    public Optional<Evaluation> findById(Long id) { return evaluationRepository.findById(id); }

    public Evaluation update(Long id, Evaluation details) {
        return evaluationRepository.findById(id)
                .map(existing -> {
                    existing.setPlayerId(details.getPlayerId());
                    existing.setEvaluatorId(details.getEvaluatorId());
                    existing.setTeamId(details.getTeamId());
                    existing.setScore(details.getScore());
                    existing.setEvaluationDate(details.getEvaluationDate());
                    return evaluationRepository.save(existing);
                })
                .orElse(null);
    }

    public boolean delete(Long id) {
        if (evaluationRepository.existsById(id)) { evaluationRepository.deleteById(id); return true; }
        return false;
    }
}
