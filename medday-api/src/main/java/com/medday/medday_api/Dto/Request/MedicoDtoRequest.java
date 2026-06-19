package com.medday.medday_api.Dto.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicoDtoRequest {

    @NotBlank(message = "Nome é obrigatório")
    @Size(max = 100)
    private String nome;

    @NotBlank(message = "Especialidade é obrigatória")
    @Size(max = 50)
    private String especialidade;
}