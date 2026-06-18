package com.medday.medday_api.Service;

import com.medday.medday_api.Domain.Paciente;
import com.medday.medday_api.Dto.Request.PacienteDtoRequest;
import com.medday.medday_api.Dto.Response.PacienteDtoResponse;
import com.medday.medday_api.Exception.RecursoDuplicadoException;
import com.medday.medday_api.Exception.ResourceNotFoundException;
import com.medday.medday_api.Repository.PacienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PacienteService {

    private final PacienteRepository pacienteRepository;

    private Paciente toEntity(PacienteDtoRequest dto) {
        return Paciente.builder()
                .nome(dto.getNome())
                .cpf(dto.getCpf())
                .dataNascimento(dto.getDataNascimento())
                .telefone(dto.getTelefone())
                .email(dto.getEmail())
                .build();
    }

    public PacienteDtoResponse criar(PacienteDtoRequest dto) {
        if (pacienteRepository.existsByCpf(dto.getCpf())) {
            throw new RecursoDuplicadoException(
                    "Já existe um paciente cadastrado com o CPF: " + dto.getCpf());
        }

        Paciente paciente = toEntity(dto);
        return PacienteDtoResponse.fromEntity(pacienteRepository.save(paciente));
    }

    public List<PacienteDtoResponse> listarTodos() {
        return pacienteRepository.findAll()
                .stream()
                .map(PacienteDtoResponse::fromEntity)
                .toList();
    }

    public PacienteDtoResponse buscarPorId(Long id) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Paciente não encontrado com id: " + id));

        return PacienteDtoResponse.fromEntity(paciente);
    }

    public PacienteDtoResponse atualizar(Long id, PacienteDtoRequest dto) {
        Paciente paciente = pacienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Paciente não encontrado com id: " + id));

        paciente.setNome(dto.getNome());
        paciente.setTelefone(dto.getTelefone());
        paciente.setEmail(dto.getEmail());
        paciente.setDataNascimento(dto.getDataNascimento());

        return PacienteDtoResponse.fromEntity(pacienteRepository.save(paciente));
    }

    public void deletar(Long id) {
        if (!pacienteRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Paciente não encontrado com id: " + id);
        }
        pacienteRepository.deleteById(id);
    }
}
