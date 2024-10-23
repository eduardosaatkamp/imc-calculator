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

    public Health createOrUpdateClient(Health health) {

        if (health.getPeso() != null && health.getAltura() != null) {
            double bmi = calculateBMI(health.getPeso(), health.getAltura());
            health.setImcCliente(bmi);

            String imcObservation = generateImcObservation(bmi);
            health.setObsImc(imcObservation);
        }

        if (health.getGlicemiaCliente() != null) {
            String glucoseObservation = generateGlucoseObservation(health.getGlicemiaCliente());
            health.setObsGlicemia(glucoseObservation);
        }

        healthRepository.save(health);
        return health;
    }

    public double calculateBMI(double peso, double altura) {
        double bmi = peso / (altura * altura);
        return Math.round(bmi * 100) / 100.0; // Arredonda para 2 casas decimais
    }

    public String generateImcObservation(double bmi) {
        if (bmi < 18.5) {
            return "Abaixo do peso";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return "Peso normal";
        } else if (bmi >= 25 && bmi < 29.9) {
            return "Sobrepeso";
        } else {
            return "Obesidade";
        }
    }

    public String generateGlucoseObservation(double glucose) {
        if (glucose < 70) {
            return "Baixa";
        } else if (glucose >= 70 && glucose <= 99) {
            return "Normal";
        } else if (glucose >= 100 && glucose <= 125) {
            return "Pré-diabetes";
        } else {
            return "Diabetes";
        }
    }

    public Optional<Health> getClientById(Long id) {
        return healthRepository.findById(id);
    }

    public List<Health> getClientsBMI() {
        return healthRepository.findByPesoNotNullAndAlturaNotNull();
    }

    public List<Health> getClientsGlucose() {
        return healthRepository.findByGlicemiaClienteNotNull();
    }

    public void deleteClient(Long id) {
        healthRepository.deleteById(id);
    }
}
