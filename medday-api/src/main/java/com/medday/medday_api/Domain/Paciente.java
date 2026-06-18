package com.medday.medday_api.Domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "paciente")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Paciente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    @NotBlank
    @Size(max = 100)
    private String nome;

    @Column(nullable = false, unique = true, length = 11)
    @Size(max = 11)
    @NotBlank
    private String cpf;

    @Past
    @Column(nullable = false)
    private LocalDate dataNascimento;

    @Column(length = 11)
    @Size(max = 11)
    private String telefone;

    @Column(unique = true)
    @Email
    private String email;

    @OneToMany(mappedBy = "paciente", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Consulta> consultas = new ArrayList<>();
}
