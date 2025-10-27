package com.examly.springapp.repository;

import com.examly.springapp.entity.Squad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository //this
public interface SquadRepository extends JpaRepository<Squad, Long> { //this
	Page<Squad> findByTeam_Id(Long teamId, Pageable pageable);
	Page<Squad> findByStatus(Squad.Status status, Pageable pageable);
	Page<Squad> findByTeam_IdAndStatus(Long teamId, Squad.Status status, Pageable pageable);
}
