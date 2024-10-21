package com.example.healthsystem.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "cliente")
public class Health {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private Double imcCliente;
    private Double glicemiaCliente;
    private String obsImc;
    private String obsGlicemia;
    private Double peso;
    private Double altura;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Timestamp createdAt;

    // Getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getImcCliente() {
        return imcCliente;
    }

    public void setImcCliente(Double imcCliente) {
        this.imcCliente = imcCliente;
    }

    public Double getGlicemiaCliente() {
        return glicemiaCliente;
    }

    public void setGlicemiaCliente(Double glicemiaCliente) {
        this.glicemiaCliente = glicemiaCliente;
    }

    public String getObsImc() {
        return obsImc;
    }

    public void setObsImc(String obsImc) {
        this.obsImc = obsImc;
    }

    public String getObsGlicemia() {
        return obsGlicemia;
    }

    public void setObsGlicemia(String obsGlicemia) {
        this.obsGlicemia = obsGlicemia;
    }

    public Double getPeso() {
        return peso;
    }

    public void setPeso(Double peso) {
        this.peso = peso;
    }

    public Double getAltura() {
        return altura;
    }

    public void setAltura(Double altura) {
        this.altura = altura;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
