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

    public Health createOrUpdateCliente(Health health) {
        // Verifica se o dado de peso e altura está presente para calcular o IMC
        if (health.getPeso() != null && health.getAltura() != null) {
            double imc = health.getPeso() / (health.getAltura() * health.getAltura());

            imc = Math.round(imc * 100) / 100.0;
            health.setImcCliente(imc);

            if (imc < 18.5) {
                health.setObsImc("Abaixo do peso");
            } else if (imc >= 18.5 && imc < 24.9) {
                health.setObsImc("Peso normal");
            } else if (imc >= 25 && imc < 29.9) {
                health.setObsImc("Sobrepeso");
            } else {
                health.setObsImc("Obesidade");
            }
        }

        if (health.getGlicemiaCliente() != null) {
            double glicemia = health.getGlicemiaCliente();

            if (glicemia < 70) {
                health.setObsGlicemia("Baixa");
            } else if (glicemia >= 70 && glicemia <= 99) {
                health.setObsGlicemia("Normal");
            } else if (glicemia >= 100 && glicemia <= 125) {
                health.setObsGlicemia("Pré-diabetes");
            } else {
                health.setObsGlicemia("Diabetes");
            }
        }

        healthRepository.save(health);
        return health;
    }

    public Optional<Health> getClienteById(Long id) {
        return healthRepository.findById(id);
    }

    public List<Health> getClientesImc() {
        return healthRepository.findByPesoNotNullAndAlturaNotNull();
    }

    public List<Health> getClientesGlicemia() {
        return healthRepository.findByGlicemiaClienteNotNull();
    }

    public void deleteCliente(Long id) {
        healthRepository.deleteById(id);
    }
}
