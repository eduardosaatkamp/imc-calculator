package com.example.healthsystem.repository;

import com.example.healthsystem.model.Health;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthRepository extends JpaRepository<Health, Long> {

    List<Health> findByPesoNotNullAndAlturaNotNull();

    List<Health> findByGlicemiaClienteNotNull();
}
