package com.medday.medday_api.Dto.Response;

import com.medday.medday_api.Domain.Consulta;
import com.medday.medday_api.Enum.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultaDtoResponse {

    private Long id;
    private LocalDate data;
    private LocalTime hora;
    private int sala;
    private Status status;

    private Long pacienteId;
    private String pacienteNome;
    private Long medicoId;
    private String medicoNome;
    private String medicoEspecialidade;

    public static ConsultaDtoResponse fromEntity(Consulta consulta) {
        return ConsultaDtoResponse.builder()
                .id(consulta.getId())
                .data(consulta.getData())
                .hora(consulta.getHora())
                .sala(consulta.getSala())
                .status(consulta.getStatus())
                .pacienteId(consulta.getPaciente().getId())
                .pacienteNome(consulta.getPaciente().getNome())
                .medicoId(consulta.getMedico().getId())
                .medicoNome(consulta.getMedico().getNome())
                .medicoEspecialidade(consulta.getMedico().getEspecialidade())
                .build();
    }
}