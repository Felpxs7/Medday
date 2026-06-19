const API_URL = "http://localhost:8080/consultas";

export async function listarConsultas() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Erro ao buscar consultas");
    }
    return response.json();
}

export async function buscarConsultaPorId(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error("Consulta não encontrada");
    }
    return response.json();
}

export async function criarConsulta(consulta) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consulta),
    });
    if (!response.ok) {
        throw new Error("Erro ao criar consulta");
    }
    return response.json();
}

export async function atualizarStatusConsulta(id, novoStatus) {
    const response = await fetch(`${API_URL}/${id}/status?novoStatus=${novoStatus}`, {
        method: "PATCH",
    });
    if (!response.ok) {
        throw new Error("Erro ao atualizar status da consulta");
    }
    return response.json();
}

export async function cancelarConsulta(id) {
    const response = await fetch(`${API_URL}/${id}/cancelar`, {
        method: "PATCH",
    });
    if (!response.ok) {
        throw new Error("Erro ao cancelar consulta");
    }
    return response.json();
}