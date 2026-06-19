package com.medday.medday_api.Controller;

import com.medday.medday_api.Dto.Request.ConsultaDtoRequest;
import com.medday.medday_api.Dto.Response.ConsultaDtoResponse;
import com.medday.medday_api.Enum.Status;
import com.medday.medday_api.Service.ConsultaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/consultas")
@RequiredArgsConstructor
public class ConsultaController {

    private final ConsultaService consultaService;

    @PostMapping
    public ResponseEntity<ConsultaDtoResponse> criar(@RequestBody @Valid ConsultaDtoRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(consultaService.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<ConsultaDtoResponse>> listarTodas() {
        return ResponseEntity.ok(consultaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsultaDtoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(consultaService.buscarPorId(id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ConsultaDtoResponse> atualizarStatus(
            @PathVariable Long id,
            @RequestParam Status novoStatus) {
        return ResponseEntity.ok(consultaService.atualizarStatus(id, novoStatus));
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<ConsultaDtoResponse> cancelar(@PathVariable Long id) {
        return ResponseEntity.ok(consultaService.cancelar(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConsultaDtoResponse> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid ConsultaDtoRequest dto) {
        return ResponseEntity.ok(consultaService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        consultaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
