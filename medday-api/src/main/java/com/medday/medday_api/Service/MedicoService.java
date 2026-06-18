package com.medday.medday_api.Service;

import com.medday.medday_api.Domain.Medico;
import com.medday.medday_api.Dto.Request.MedicoDtoRequest;
import com.medday.medday_api.Dto.Response.MedicoDtoResponse;
import com.medday.medday_api.Exception.RecursoDuplicadoException;
import com.medday.medday_api.Exception.ResourceNotFoundException;
import com.medday.medday_api.Repository.MedicoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicoService {

    private final MedicoRepository medicoRepository;

    private Medico toEntity(MedicoDtoRequest dto) {
        return Medico.builder()
                .nome(dto.getNome())
                .crm(dto.getCrm())
                .especialidade(dto.getEspecialidade())
                .telefone(dto.getTelefone())
                .email(dto.getEmail())
                .build();
    }

    public MedicoDtoResponse criar (MedicoDtoRequest dto){
        if (medicoRepository.existsByCrm(dto.getCrm())) {
            throw new RecursoDuplicadoException(
                    "Já existe um médico cadastrado com o CRM: " + dto.getCrm());
        }

        Medico medico = toEntity(dto);
        return MedicoDtoResponse.fromEntity(medicoRepository.save(medico));
    }

    public List<MedicoDtoResponse> listarTodos() {
        return medicoRepository.findAll()
                .stream()
                .map(MedicoDtoResponse::fromEntity)
                .toList();
    }

    public MedicoDtoResponse buscarPorId(Long id) {
        Medico medico = medicoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Médico não encontrado com id: " + id));

        return MedicoDtoResponse.fromEntity(medico);
    }

    public MedicoDtoResponse atualizar(Long id, MedicoDtoRequest dto) {
        Medico medico = medicoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Médico não encontrado com id: " + id));

        medico.setNome(dto.getNome());
        medico.setEspecialidade(dto.getEspecialidade());
        medico.setTelefone(dto.getTelefone());
        medico.setEmail(dto.getEmail());

        return MedicoDtoResponse.fromEntity(medicoRepository.save(medico));
    }

    public void deletar(Long id) {
        if (!medicoRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Médico não encontrado com id: " + id);
        }
        medicoRepository.deleteById(id);
    }
}
