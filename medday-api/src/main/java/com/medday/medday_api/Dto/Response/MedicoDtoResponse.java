package com.medday.medday_api.Dto.Response;

import com.medday.medday_api.Domain.Medico;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicoDtoResponse {

    private Long id;
    private String nome;
    private String especialidade;

    public static MedicoDtoResponse fromEntity(Medico medico) {
        return MedicoDtoResponse.builder()
                .id(medico.getId())
                .nome(medico.getNome())
                .especialidade(medico.getEspecialidade())
                .build();
    }
}