package com.medday.medday_api.Repository;

import com.medday.medday_api.Domain.Medico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicoRepository extends JpaRepository<Medico, Long> {
    boolean existsByCrm (String crm);
}
