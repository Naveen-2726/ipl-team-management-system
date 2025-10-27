package com.examly.springapp.repository;

import com.examly.springapp.entity.Teamadmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamadminRepository extends JpaRepository<Teamadmin, Long> {
}