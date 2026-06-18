package com.medday.medday_api.Dto.Response;

import com.medday.medday_api.Domain.Consulta;
import com.medday.medday_api.Enum.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultaDtoResponse {
    private Long id;
    private LocalDateTime dataHora;
    private Integer duracaoMinutos;
    private int sala;
    private Status status;
    private String observacoes;
    private Long pacienteId;
    private String pacienteNome;
    private Long medicoId;
    private String medicoNome;
    private String medicoEspecialidade;

    public static ConsultaDtoResponse fromEntity(Consulta consulta) {
        return ConsultaDtoResponse.builder()
                .id(consulta.getId())
                .dataHora(consulta.getDataHora())
                .duracaoMinutos(consulta.getDuracaoMinutos())
                .sala(consulta.getSala())
                .status(consulta.getStatus())
                .observacoes(consulta.getObservacoes())
                .pacienteId(consulta.getPaciente().getId())
                .pacienteNome(consulta.getPaciente().getNome())
                .medicoId(consulta.getMedico().getId())
                .medicoNome(consulta.getMedico().getNome())
                .medicoEspecialidade(consulta.getMedico().getEspecialidade())
                .build();
    }
}
