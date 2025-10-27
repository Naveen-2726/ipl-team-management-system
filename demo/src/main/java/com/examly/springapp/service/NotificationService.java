package com.examly.springapp.service;

import com.examly.springapp.entity.Notification;
import com.examly.springapp.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page; //this
import org.springframework.data.domain.Pageable; //this
import org.springframework.stereotype.Service;

@Service //this
public class NotificationService { //this
    @Autowired private NotificationRepository repo; //this

    public Page<Notification> findAll(Pageable pageable) { return repo.findAll(pageable); } //this
}
