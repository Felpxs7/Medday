const CHAVE = "medday_pacientes";

export function listarPacientes() {
    return JSON.parse(localStorage.getItem(CHAVE)) || [];
}

export function salvarPacientes(pacientes) {
    localStorage.setItem(CHAVE, JSON.stringify(pacientes));
}