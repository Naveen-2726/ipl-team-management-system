package com.examly.springapp.repository;

import com.examly.springapp.entity.TeamAnalytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository //this
public interface TeamAnalyticsRepository extends JpaRepository<TeamAnalytics, Long> { //this
}
