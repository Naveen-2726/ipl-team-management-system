package com.examly.springapp.repository;

import com.examly.springapp.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository //this
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> { //this
}
