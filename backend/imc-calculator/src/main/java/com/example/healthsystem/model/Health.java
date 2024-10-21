package com.example.healthsystem.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "cliente")
@Data
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
}
