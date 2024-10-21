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
    public ResponseEntity<?> createOrUpdateCliente(@RequestBody Health health) {
        if (health.getNome() == null || health.getNome().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("O campo 'nome' é obrigatório.");
        }

        // Verifica se pelo menos uma das combinações de dados está presente
        boolean isValidImcInput = health.getPeso() != null && health.getAltura() != null;
        boolean isValidGlicemiaInput = health.getGlicemiaCliente() != null;

        if (!isValidImcInput && !isValidGlicemiaInput) {
            return ResponseEntity.badRequest().body("Forneça dados de IMC (peso e altura) ou glicemia.");
        }

        healthService.createOrUpdateCliente(health);
        return new ResponseEntity<>("Dados do cliente processados com sucesso.", HttpStatus.OK);
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

    // --- INÍCIO: Novos endpoints para editar e excluir ---

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
        healthToUpdate.setImcCliente(health.getImcCliente());
        healthToUpdate.setObsImc(health.getObsImc());
        healthToUpdate.setGlicemiaCliente(health.getGlicemiaCliente());
        healthToUpdate.setObsGlicemia(health.getObsGlicemia());

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

    // --- FIM: Novos endpoints para editar e excluir ---
}

