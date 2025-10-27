package com.examly.springapp.service;

import com.examly.springapp.entity.TeamAnalytics;
import com.examly.springapp.repository.TeamAnalyticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; //this
import org.springframework.data.domain.Pageable; //this
import org.springframework.stereotype.Service;

@Service //this
public class TeamAnalyticsService { //this
    @Autowired private TeamAnalyticsRepository repo; //this

    public Page<TeamAnalytics> findAll(Pageable pageable) { return repo.findAll(pageable); } //this
}
