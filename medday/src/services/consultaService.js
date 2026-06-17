const CHAVE = "medday_consultas";

export function listarConsultas() {
    return JSON.parse(localStorage.getItem(CHAVE)) || [];
}

export function salvarConsultas(consultas) {
    localStorage.setItem(CHAVE, JSON.stringify(consultas));
}