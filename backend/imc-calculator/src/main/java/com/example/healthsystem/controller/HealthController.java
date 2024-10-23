package com.example.healthsystem.controller;

import com.example.healthsystem.model.Health;
import com.example.healthsystem.service.HealthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/cliente")
public class HealthController {

    @Autowired
    private HealthService healthService;

    @PostMapping
    public ResponseEntity<Health> createOrUpdateClient(@RequestBody Health health) {
        if (health.getNome() == null || health.getNome().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        boolean isValidImcInput = health.getPeso() != null && health.getAltura() != null;
        boolean isValidGlicemiaInput = health.getGlicemiaCliente() != null;

        if (!isValidImcInput && !isValidGlicemiaInput) {
            return ResponseEntity.badRequest().body(null);
        }

        if (isValidImcInput) {
            double imc = health.getPeso() / (health.getAltura() * health.getAltura());
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

        if (isValidGlicemiaInput) {
            if (health.getGlicemiaCliente() < 70) {
                health.setObsGlicemia("Hipoglicemia");
            } else if (health.getGlicemiaCliente() >= 70 && health.getGlicemiaCliente() <= 99) {
                health.setObsGlicemia("Normal");
            } else if (health.getGlicemiaCliente() >= 100 && health.getGlicemiaCliente() <= 125) {
                health.setObsGlicemia("Pré-diabetes");
            } else {
                health.setObsGlicemia("Diabetes");
            }
        }

        Health savedHealth = healthService.createOrUpdateClient(health);

        return ResponseEntity.ok(savedHealth);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Health> getClienteById(@PathVariable Long id) {
        Optional<Health> cliente = healthService.getClientById(id);

        return cliente.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping(params = "tipo=imc")
    public ResponseEntity<List<Health>> getClientsBMI() {
        List<Health> clientesImc = healthService.getClientsBMI();
        return ResponseEntity.ok(clientesImc);
    }

    @GetMapping(params = "tipo=glicemia")
    public ResponseEntity<List<Health>> getClientsGlucose() {
        List<Health> clientesGlicemia = healthService.getClientsGlucose();
        return ResponseEntity.ok(clientesGlicemia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCliente(@PathVariable Long id, @RequestBody Health health) {
        Optional<Health> existingCliente = healthService.getClientById(id);
        if (!existingCliente.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }

        Health healthToUpdate = existingCliente.get();
        healthToUpdate.setNome(health.getNome());
        healthToUpdate.setPeso(health.getPeso());
        healthToUpdate.setAltura(health.getAltura());

        boolean isValidImcInput = health.getPeso() != null && health.getAltura() != null;
        if (isValidImcInput) {
            double imc = health.getPeso() / (health.getAltura() * health.getAltura());
            healthToUpdate.setImcCliente(imc);

            if (imc < 18.5) {
                healthToUpdate.setObsImc("Abaixo do peso");
            } else if (imc >= 18.5 && imc < 24.9) {
                healthToUpdate.setObsImc("Peso normal");
            } else if (imc >= 25 && imc < 29.9) {
                healthToUpdate.setObsImc("Sobrepeso");
            } else {
                healthToUpdate.setObsImc("Obesidade");
            }
        }

        boolean isValidGlicemiaInput = health.getGlicemiaCliente() != null;
        if (isValidGlicemiaInput) {
            if (health.getGlicemiaCliente() < 70) {
                healthToUpdate.setObsGlicemia("Hipoglicemia");
            } else if (health.getGlicemiaCliente() >= 70 && health.getGlicemiaCliente() <= 99) {
                healthToUpdate.setObsGlicemia("Normal");
            } else if (health.getGlicemiaCliente() >= 100 && health.getGlicemiaCliente() <= 125) {
                healthToUpdate.setObsGlicemia("Pré-diabetes");
            } else {
                healthToUpdate.setObsGlicemia("Diabetes");
            }
        }

        healthService.createOrUpdateClient(healthToUpdate);
        return new ResponseEntity<>("Cliente atualizado com sucesso.", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable Long id) {
        Optional<Health> existingCliente = healthService.getClientById(id);
        if (!existingCliente.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }

        healthService.deleteClient(id);
        return new ResponseEntity<>("Cliente excluído com sucesso.", HttpStatus.OK);
    }

    public void setHealthService(HealthService healthService) {
    }
}
