import { useNavigate } from "react-router-dom";

import KpiCard from "../../components/KpiCard/KpiCard";
import Timeline from "../../components/Timeline/Timeline";
import ConsultasStatusChart from "../../components/Charts/ConsultasStatusChart";

import { listarPacientes } from "../../services/pacienteService";
import { listarMedicos } from "../../services/medicoService";
import { listarConsultas } from "../../services/consultaService";

import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const pacientes = listarPacientes();
    const medicos = listarMedicos();
    const consultas = listarConsultas();

    const hoje = new Date()
        .toISOString()
        .split("T")[0];

    const consultasHoje =
        consultas.filter(
            (consulta) =>
                consulta.data === hoje
        );

    const consultasConfirmadas =
        consultas.filter(
            (consulta) =>
                consulta.status ===
                "Confirmado"
        );

    const consultasPendentes =
        consultas.filter(
            (consulta) =>
                consulta.status ===
                "Em atendimento"
        );

    const taxaOcupacao =
        consultas.length === 0
            ? 0
            : Math.round(
                  (
                      consultasConfirmadas.length /
                      consultas.length
                  ) * 100
              );
              const proximasConsultas = [...consultas]
                    .sort((a, b) => {
                        const dataA = new Date(`${a.data}T${a.horario}`);
                        const dataB = new Date(`${b.data}T${b.horario}`);
                        return dataA - dataB;
                    })
                    .slice(0, 5);

    return (
    <div className="dashboard">

        <div className="dashboard-header">
            <h1>Dashboard</h1>

            <button
                className="novo-agendamento"
                onClick={() => navigate("/agenda")}
            >
                + Novo Agendamento
            </button>
        </div>

        <div className="kpi-grid">

            <KpiCard
                titulo="Consultas Hoje"
                valor={consultasHoje.length}
                detalhe="Agenda do dia"
                cor="azul"
            />

            <KpiCard
                titulo="Pacientes"
                valor={pacientes.length}
                detalhe="Cadastrados"
                cor="verde"
            />

            <KpiCard
                titulo="Médicos"
                valor={medicos.length}
                detalhe="Disponíveis"
                cor="roxo"
            />

            <KpiCard
                titulo="Pendentes"
                valor={consultasPendentes.length}
                detalhe="Em atendimento"
                cor="laranja"
            />

            <KpiCard
                titulo="Taxa de Ocupação"
                valor={`${taxaOcupacao}%`}
                detalhe="Consultas confirmadas"
                cor="ciano"
            />

        </div>

        <Timeline consultas={consultasHoje} />

        <div className="dashboard-bottom">

            <ConsultasStatusChart
                consultas={consultas}
            />

            <div className="dashboard-section">

                <h2>Próximas Consultas</h2>

                {proximasConsultas.length === 0 ? (
                    <p>Nenhuma consulta cadastrada.</p>
                ) : (
                    proximasConsultas.map((consulta) => (
                        <div
                            key={consulta.id}
                            className="timeline-item"
                            style={{
                                justifyContent: "flex-start"
                            }}
                        >
                            <strong>
                                {consulta.horario}
                            </strong>

                            <div
                                style={{
                                    alignItems: "flex-start",
                                    textAlign: "left"
                                }}
                            >
                                <p>{consulta.paciente}</p>

                                <small>
                                    Dr(a). {consulta.medico}
                                </small>
                            </div>
                        </div>
                    ))
                )}

            </div>

        </div>

    </div>
);
}

export default Dashboard;