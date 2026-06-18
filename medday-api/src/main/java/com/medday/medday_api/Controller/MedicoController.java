package com.medday.medday_api.Controller;

import com.medday.medday_api.Dto.Request.MedicoDtoRequest;
import com.medday.medday_api.Dto.Response.MedicoDtoResponse;
import com.medday.medday_api.Service.MedicoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicos")
@RequiredArgsConstructor
public class MedicoController {

    private final MedicoService medicoService;

    @PostMapping
    public ResponseEntity<MedicoDtoResponse> criar(@RequestBody @Valid MedicoDtoRequest dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(medicoService.criar(dto));
    }

    @GetMapping
    public ResponseEntity<List<MedicoDtoResponse>> listarTodos() {
        return ResponseEntity.ok(medicoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicoDtoResponse> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(medicoService.buscarPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicoDtoResponse> atualizar(
            @PathVariable Long id,
            @RequestBody @Valid MedicoDtoRequest dto) {
        return ResponseEntity.ok(medicoService.atualizar(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        medicoService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
