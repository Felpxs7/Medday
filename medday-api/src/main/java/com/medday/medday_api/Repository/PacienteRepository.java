package com.medday.medday_api.Repository;

import com.medday.medday_api.Domain.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {
    boolean existsByCpf (String cpf);
}
