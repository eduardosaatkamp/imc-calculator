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

    // Endpoint para criar ou atualizar dados de IMC ou Glicemia
    @PostMapping
    public ResponseEntity<Health> createOrUpdateCliente(@RequestBody Health health) {
        if (health.getNome() == null || health.getNome().trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        // Verifica se pelo menos uma das combinações de dados está presente
        boolean isValidImcInput = health.getPeso() != null && health.getAltura() != null;
        boolean isValidGlicemiaInput = health.getGlicemiaCliente() != null;

        if (!isValidImcInput && !isValidGlicemiaInput) {
            return ResponseEntity.badRequest().body(null);
        }

        // Calcular o IMC e definir observações
        if (isValidImcInput) {
            double imc = health.getPeso() / (health.getAltura() * health.getAltura());
            health.setImcCliente(imc);

            // Adiciona a observação de IMC
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

        // Adiciona a observação de glicemia
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

        // Salvar os dados do cliente no banco de dados
        Health savedHealth = healthService.createOrUpdateCliente(health);

        // Retornar o objeto atualizado
        return ResponseEntity.ok(savedHealth);
    }

    // Endpoint para obter um cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<Health> getClienteById(@PathVariable Long id) {
        Optional<Health> cliente = healthService.getClienteById(id);

        return cliente.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    // Endpoint para listar clientes com dados de IMC
    @GetMapping(params = "tipo=imc")
    public ResponseEntity<List<Health>> getClientesImc() {
        List<Health> clientesImc = healthService.getClientesImc();
        return ResponseEntity.ok(clientesImc);
    }

    // Endpoint para listar clientes com dados de Glicemia
    @GetMapping(params = "tipo=glicemia")
    public ResponseEntity<List<Health>> getClientesGlicemia() {
        List<Health> clientesGlicemia = healthService.getClientesGlicemia();
        return ResponseEntity.ok(clientesGlicemia);
    }

    // Endpoint para atualizar um cliente existente
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCliente(@PathVariable Long id, @RequestBody Health health) {
        Optional<Health> existingCliente = healthService.getClienteById(id);
        if (!existingCliente.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }

        // Atualiza os dados do cliente existente
        Health healthToUpdate = existingCliente.get();
        healthToUpdate.setNome(health.getNome());
        healthToUpdate.setPeso(health.getPeso());
        healthToUpdate.setAltura(health.getAltura());

        // Recalcula o IMC e as observações, se necessário
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

        healthService.createOrUpdateCliente(healthToUpdate);
        return new ResponseEntity<>("Cliente atualizado com sucesso.", HttpStatus.OK);
    }

    // Endpoint para excluir um cliente por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCliente(@PathVariable Long id) {
        Optional<Health> existingCliente = healthService.getClienteById(id);
        if (!existingCliente.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }

        healthService.deleteCliente(id);
        return new ResponseEntity<>("Cliente excluído com sucesso.", HttpStatus.OK);
    }
}
