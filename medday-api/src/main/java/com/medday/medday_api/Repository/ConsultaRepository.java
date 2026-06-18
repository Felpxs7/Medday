package com.medday.medday_api.Repository;

import com.medday.medday_api.Domain.Consulta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {
    @Query("SELECT c FROM Consulta c WHERE c.medico.id = :medicoId " +
            "AND c.status NOT IN ('CANCELADO', 'FINALIZADO')")
    List<Consulta> findConsultasAtivasPorMedico(@Param("medicoId") Long medicoId);
}
