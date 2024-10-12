package com.example.imc_calculator.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ImcRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Float weight;
    private Float height;
    private Float calculatedImc;

    // Construtores
    public ImcRecord() {}

    public ImcRecord(Float weight, Float height) {
        this.weight = weight;
        this.height = height;
        this.calculatedImc = calculateImc(weight, height);
    }

    // Método para calcular o IMC
    private Float calculateImc(Float weight, Float height) {
        if (height > 0) {
            return weight / (height * height);
        } else {
            return 0f; // ou lance uma exceção
        }
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getWeight() {
        return weight;
    }

    public void setWeight(Float weight) {
        this.weight = weight;
    }

    public Float getHeight() {
        return height;
    }

    public void setHeight(Float height) {
        this.height = height;
    }


    public Float getCalculatedImc() {
        return calculatedImc;
    }

    public void setCalculatedImc(Float calculatedImc) {
        this.calculatedImc = calculatedImc;
    }
}
