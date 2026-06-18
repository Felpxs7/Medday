package com.medday.medday_api.Dto.Request;

import com.medday.medday_api.Enum.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultaDtoRequest {

    @NotNull
    @Future(message = "A consulta deve ser agendada para uma data futura.")
    private LocalDateTime dataHora;

    @NotNull
    @Min(value = 15, message = "Duração minima é de 15 minutos.")
    private Integer duracaoMinutos;

    @Min(value = 1)
    private int sala;

    @Size(max = 300)
    private String observacoes;

    @NotNull(message = "Paciente é obrigatório.")
    private Long pacienteId;

    @NotNull(message = "Médico é obrigatório.")
    private Long medicoId;
}
