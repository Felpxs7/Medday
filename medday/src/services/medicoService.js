const API_URL = "http://localhost:8080/medicos";

export async function listarMedicos() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Erro ao buscar médicos");
    }
    return response.json();
}

export async function buscarMedicoPorId(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error("Médico não encontrado");
    }
    return response.json();
}

export async function criarMedico(medico) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medico),
    });
    if (!response.ok) {
        throw new Error("Erro ao criar médico");
    }
    return response.json();
}

export async function atualizarMedico(id, medico) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(medico),
    });
    if (!response.ok) {
        throw new Error("Erro ao atualizar médico");
    }
    return response.json();
}

export async function deletarMedico(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Erro ao deletar médico");
    }
}