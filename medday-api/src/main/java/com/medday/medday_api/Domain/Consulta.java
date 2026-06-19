package com.medday.medday_api.Domain;

import com.medday.medday_api.Enum.Status;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

import java.time.LocalTime;

@Entity
@Table(name = "consulta")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Consulta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "data", nullable = false)
    private LocalDate data;

    @NotNull
    @Column(name = "hora", nullable = false)
    private LocalTime hora;

    @Column(nullable = false)
    private int sala;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Status status;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "paciente_id", nullable = false)
    private Paciente paciente;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "medico_id", nullable = false)
    private Medico medico;
}