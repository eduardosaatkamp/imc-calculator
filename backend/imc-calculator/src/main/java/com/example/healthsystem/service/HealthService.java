package com.example.healthsystem.service;

import com.example.healthsystem.model.Health;
import com.example.healthsystem.repository.HealthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HealthService {

    @Autowired
    private HealthRepository healthRepository;

    public void createOrUpdateCliente(Health health) {
        healthRepository.save(health);
    }

    public Optional<Health> getClienteById(Long id) {
        return healthRepository.findById(id);
    }

    // Buscar clientes com dados de IMC
    public List<Health> getClientesImc() {
        return healthRepository.findByPesoNotNullAndAlturaNotNull();
    }

    // Buscar clientes com dados de Glicemia
    public List<Health> getClientesGlicemia() {
        return healthRepository.findByGlicemiaClienteNotNull();
    }

    public void deleteCliente(Long id) {
        healthRepository.deleteById(id);
    }

}
