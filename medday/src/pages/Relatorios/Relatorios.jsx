import { useEffect, useState } from "react";

import { listarPacientes } from "../../services/pacienteService";
import { listarMedicos } from "../../services/medicoService";
import { listarConsultas } from "../../services/consultaService";

import jsPDF from "jspdf";

function Relatorios() {
    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [consultas, setConsultas] = useState([]);

    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {
        try {
            const [dadosPacientes, dadosMedicos, dadosConsultas] = await Promise.all([
                listarPacientes(),
                listarMedicos(),
                listarConsultas(),
            ]);
            setPacientes(dadosPacientes);
            setMedicos(dadosMedicos);
            setConsultas(dadosConsultas);
        } catch (erro) {
            console.error("Erro ao carregar relatórios:", erro);
        }
    }

    const confirmadas = consultas.filter((c) => c.status === "CONFIRMADO");
    const canceladas = consultas.filter((c) => c.status === "CANCELADO");
    const emAtendimento = consultas.filter((c) => c.status === "EM_ATENDIMENTO");
    const finalizadas = consultas.filter((c) => c.status === "FINALIZADO");

    function gerarPDF() {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("MEDDAY - RELATÓRIO GERAL", 20, 20);

        doc.setFontSize(12);
        doc.text("Resumo do Sistema:", 20, 40);

        doc.text(`Pacientes cadastrados: ${pacientes.length}`, 20, 55);
        doc.text(`Médicos cadastrados: ${medicos.length}`, 20, 65);
        doc.text(`Total de consultas: ${consultas.length}`, 20, 75);

        doc.text("Status das consultas:", 20, 95);

        doc.text(`✔ Confirmadas: ${confirmadas.length}`, 20, 110);
        doc.text(`🟡 Em atendimento: ${emAtendimento.length}`, 20, 120);
        doc.text(`🏁 Finalizadas: ${finalizadas.length}`, 20, 130);
        doc.text(`❌ Canceladas: ${canceladas.length}`, 20, 140);

        doc.setFontSize(10);
        doc.text("Gerado automaticamente pelo sistema MEDDAY", 20, 160);

        doc.save("medday-relatorio.pdf");
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Relatórios</h1>

            <button
                onClick={gerarPDF}
                style={{
                    padding: "10px 15px",
                    marginTop: "10px",
                    marginBottom: "20px",
                    border: "none",
                    borderRadius: "8px",
                    background: "#2d6cdf",
                    color: "white",
                    cursor: "pointer",
                }}
            >
                📄 Gerar Relatório PDF
            </button>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                    gap: "20px",
                    marginTop: "10px",
                }}
            >
                <Card title="Pacientes" value={pacientes.length} />
                <Card title="Médicos" value={medicos.length} />
                <Card title="Consultas" value={consultas.length} />
                <Card title="Finalizadas" value={finalizadas.length} />
            </div>

            <div
                style={{
                    marginTop: "30px",
                    background: "white",
                    padding: "20px",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,.05)",
                }}
            >
                <h2>Consultas por Status</h2>

                <p>✅ Confirmadas: {confirmadas.length}</p>
                <p>🟡 Em atendimento: {emAtendimento.length}</p>
                <p>🏁 Finalizadas: {finalizadas.length}</p>
                <p>❌ Canceladas: {canceladas.length}</p>
            </div>
        </div>
    );
}

function Card({ title, value }) {
    return (
        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,.05)",
                textAlign: "center",
            }}
        >
            <h3>{title}</h3>
            <p style={{ fontSize: "28px", fontWeight: "bold" }}>{value}</p>
        </div>
    );
}

export default Relatorios;