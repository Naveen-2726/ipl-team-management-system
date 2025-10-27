package com.examly.springapp.service;

import com.examly.springapp.entity.AuditLog;
import com.examly.springapp.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; //this
import org.springframework.data.domain.Pageable; //this
import org.springframework.stereotype.Service;

@Service //this
public class AuditLogService { //this
    @Autowired private AuditLogRepository repo; //this

    public Page<AuditLog> findAll(Pageable pageable) { return repo.findAll(pageable); } //this
}
