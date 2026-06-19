package com.medday.medday_api.Dto.Response;

import com.medday.medday_api.Domain.Paciente;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PacienteDtoResponse {

    private Long id;
    private String nome;
    private String telefone;

    public static PacienteDtoResponse fromEntity(Paciente paciente) {
        return PacienteDtoResponse.builder()
                .id(paciente.getId())
                .nome(paciente.getNome())
                .telefone(paciente.getTelefone())
                .build();
    }
}