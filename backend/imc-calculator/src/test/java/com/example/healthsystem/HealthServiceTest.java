package com.example.healthsystem;

import com.example.healthsystem.service.HealthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class HealthServiceTest {

    private HealthService healthService;

    @BeforeEach
    void setUp() {
        healthService = new HealthService();
    }

    @Test
    void testCalculateBMI_NormalWeight() {

        double peso = 70.0;
        double altura = 1.75;

        double bmi = healthService.calculateBMI(peso, altura);

        assertEquals(22.86, bmi, 0.01);

        String obsImc = healthService.generateImcObservation(bmi);
        assertEquals("Peso normal", obsImc);
    }

    @Test
    void testGlucoseObservation_Normal() {

        double glicemia = 85.0;

        String obsGlicemia = healthService.generateGlucoseObservation(glicemia);

        assertEquals("Normal", obsGlicemia);
    }
}
