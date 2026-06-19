package com.medday.medday_api.Service;

import com.medday.medday_api.Domain.Consulta;
import com.medday.medday_api.Domain.Medico;
import com.medday.medday_api.Domain.Paciente;
import com.medday.medday_api.Dto.Request.ConsultaDtoRequest;
import com.medday.medday_api.Dto.Response.ConsultaDtoResponse;
import com.medday.medday_api.Enum.Status;
import com.medday.medday_api.Exception.BusinessException;
import com.medday.medday_api.Exception.ConflitoDeHorarioException;
import com.medday.medday_api.Exception.ResourceNotFoundException;
import com.medday.medday_api.Repository.ConsultaRepository;
import com.medday.medday_api.Repository.MedicoRepository;
import com.medday.medday_api.Repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultaService {

    private final ConsultaRepository consultaRepository;
    private final MedicoRepository medicoRepository;
    private final PacienteRepository pacienteRepository;

    public ConsultaDtoResponse criar(ConsultaDtoRequest dto) {

        Medico medico = medicoRepository.findById(dto.getMedicoId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Médico não encontrado com id: " + dto.getMedicoId()));

        Paciente paciente = pacienteRepository.findById(dto.getPacienteId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Paciente não encontrado com id: " + dto.getPacienteId()));

        validarConflitoDeHorario(dto.getMedicoId(), dto.getData(), dto.getHora(), null);

        Consulta consulta = Consulta.builder()
                .data(dto.getData())
                .hora(dto.getHora())
                .sala(dto.getSala())
                .status(Status.EM_ESPERA)
                .paciente(paciente)
                .medico(medico)
                .build();

        return ConsultaDtoResponse.fromEntity(consultaRepository.save(consulta));
    }

    public List<ConsultaDtoResponse> listarTodas() {
        return consultaRepository.findAll()
                .stream()
                .map(ConsultaDtoResponse::fromEntity)
                .toList();
    }

    public ConsultaDtoResponse buscarPorId(Long id) {
        Consulta consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Consulta não encontrada com id: " + id));

        return ConsultaDtoResponse.fromEntity(consulta);
    }

    public ConsultaDtoResponse atualizarStatus(Long id, Status novoStatus) {
        Consulta consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Consulta não encontrada com id: " + id));

        if (consulta.getStatus() == Status.FINALIZADO || consulta.getStatus() == Status.CANCELADO) {
            throw new BusinessException(
                    "Não é possível alterar o status de uma consulta já " +
                            consulta.getStatus().name().toLowerCase());
        }

        consulta.setStatus(novoStatus);
        return ConsultaDtoResponse.fromEntity(consultaRepository.save(consulta));
    }

    public ConsultaDtoResponse cancelar(Long id) {
        return atualizarStatus(id, Status.CANCELADO);
    }

    private void validarConflitoDeHorario(Long medicoId, java.time.LocalDate data,
                                          java.time.LocalTime hora, Long consultaIdIgnorar) {

        List<Consulta> consultasDoMedico = consultaRepository.findConsultasAtivasPorMedico(medicoId);

        for (Consulta c : consultasDoMedico) {

            if (consultaIdIgnorar != null && c.getId().equals(consultaIdIgnorar)) continue;

            if (c.getStatus() == Status.CANCELADO || c.getStatus() == Status.FINALIZADO) continue;

            boolean mesmoHorario = c.getData().equals(data) && c.getHora().equals(hora);

            if (mesmoHorario) {
                throw new ConflitoDeHorarioException(
                        "O médico já possui consulta agendada em " + data + " às " + hora);
            }
        }
    }

    public ConsultaDtoResponse atualizar(Long id, ConsultaDtoRequest dto) {

        Consulta consulta = consultaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Consulta não encontrada com id: " + id));

        if (consulta.getStatus() == Status.FINALIZADO || consulta.getStatus() == Status.CANCELADO) {
            throw new BusinessException(
                    "Não é possível editar uma consulta já " +
                            consulta.getStatus().name().toLowerCase());
        }

        Medico medico = medicoRepository.findById(dto.getMedicoId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Médico não encontrado com id: " + dto.getMedicoId()));

        Paciente paciente = pacienteRepository.findById(dto.getPacienteId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Paciente não encontrado com id: " + dto.getPacienteId()));

        validarConflitoDeHorario(dto.getMedicoId(), dto.getData(), dto.getHora(), id);

        consulta.setData(dto.getData());
        consulta.setHora(dto.getHora());
        consulta.setSala(dto.getSala());
        consulta.setPaciente(paciente);
        consulta.setMedico(medico);

        return ConsultaDtoResponse.fromEntity(consultaRepository.save(consulta));
    }

    public void deletar(Long id) {
        if (!consultaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Consulta não encontrada com id: " + id);
        }
        consultaRepository.deleteById(id);
    }
}