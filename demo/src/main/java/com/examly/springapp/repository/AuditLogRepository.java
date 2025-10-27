package com.examly.springapp.repository;

import com.examly.springapp.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository //this
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> { //this
}
