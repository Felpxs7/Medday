package com.medday.medday_api.Dto.Response;

import com.medday.medday_api.Domain.Medico;
import com.medday.medday_api.Domain.Paciente;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PacienteDtoResponse {

    private Long id;
    private String nome;
    private String cpf;
    private LocalDate dataNascimento;
    private String telefone;
    private String email;

    public static PacienteDtoResponse fromEntity(Paciente paciente) {
        return PacienteDtoResponse.builder()
                .id(paciente.getId())
                .nome(paciente.getNome())
                .cpf(paciente.getCpf())
                .dataNascimento(paciente.getDataNascimento())
                .telefone(paciente.getTelefone())
                .email(paciente.getEmail())
                .build();
    }
}
