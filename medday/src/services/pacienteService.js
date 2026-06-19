const API_URL = "http://localhost:8080/pacientes";

export async function listarPacientes() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Erro ao buscar pacientes");
    }
    return response.json();
}

export async function buscarPacientePorId(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error("Paciente não encontrado");
    }
    return response.json();
}

export async function criarPaciente(paciente) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paciente),
    });
    if (!response.ok) {
        throw new Error("Erro ao criar paciente");
    }
    return response.json();
}

export async function atualizarPaciente(id, paciente) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paciente),
    });
    if (!response.ok) {
        throw new Error("Erro ao atualizar paciente");
    }
    return response.json();
}

export async function deletarPaciente(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Erro ao deletar paciente");
    }
}