package com.example.healthsystem.repository;

import com.example.healthsystem.model.Health;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HealthRepository extends JpaRepository<Health, Long> {

    // Método para buscar clientes com dados de IMC
    List<Health> findByPesoNotNullAndAlturaNotNull();

    // Método para buscar clientes com dados de Glicemia
    List<Health> findByGlicemiaClienteNotNull();
}
