package com.examly.springapp.repository;

import com.examly.springapp.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository //this
public interface NotificationRepository extends JpaRepository<Notification, Long> { //this
}
