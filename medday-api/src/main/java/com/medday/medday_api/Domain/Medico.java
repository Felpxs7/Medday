package com.medday.medday_api.Domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "medico")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Medico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String nome;

    @NotBlank
    @Size(max = 50)
    @Column(nullable = false, length = 50)
    private String especialidade;

    @OneToMany(mappedBy = "medico", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Consulta> consultas = new ArrayList<>();
}