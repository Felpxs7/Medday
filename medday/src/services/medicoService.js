const CHAVE = "medday_medicos";

export function listarMedicos() {
    return JSON.parse(localStorage.getItem(CHAVE)) || [];
}

export function salvarMedicos(medicos) {
    localStorage.setItem(CHAVE, JSON.stringify(medicos));
}