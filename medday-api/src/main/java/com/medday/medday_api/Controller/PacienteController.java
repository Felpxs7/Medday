package com.medday.medday_api.Controller;

import com.medday.medday_api.Dto.Request.PacienteDtoRequest;
import com.medday.medday_api.Dto.Response.PacienteDtoResponse;
import com.medday.medday_api.Service.PacienteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pacientes")
@RequiredArgsConstructor
public class PacienteController {

    private final PacienteService pacienteService;

    @PostMapping
    public ResponseEntity<PacienteDtoResponse> criar(@RequestBody @Valid PacienteDtoRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pacienteService.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<PacienteDtoResponse>> listarTodos() {
        return ResponseEntity.ok(pacienteService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PacienteDtoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(pacienteService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PacienteDtoResponse> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid PacienteDtoRequest dto) {
        return ResponseEntity.ok(pacienteService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        pacienteService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
