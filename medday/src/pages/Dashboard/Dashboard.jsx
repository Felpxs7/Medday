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

    return (
        <div className="dashboard">

            <div className="dashboard-header">

                <h1>Dashboard</h1>

                <button
                    className="novo-agendamento"
                    onClick={() =>
                        navigate("/agenda")
                    }
                >
                    + Novo Agendamento
                </button>

            </div>

            <div className="kpi-grid">

                <KpiCard
                    titulo="Consultas Hoje"
                    valor={
                        consultasHoje.length
                    }
                    detalhe="Agenda do dia"
                />

                <KpiCard
                    titulo="Pacientes"
                    valor={
                        pacientes.length
                    }
                    detalhe="Cadastrados"
                />

                <KpiCard
                    titulo="Médicos"
                    valor={
                        medicos.length
                    }
                    detalhe="Disponíveis"
                />

                <KpiCard
                    titulo="Pendentes"
                    valor={
                        consultasPendentes.length
                    }
                    detalhe="Em atendimento"
                />

                <KpiCard
                    titulo="Taxa de Ocupação"
                    valor={`${taxaOcupacao}%`}
                    detalhe="Consultas confirmadas"
                />

            </div>

            <Timeline
                consultas={consultasHoje}
            />

            <div className="dashboard-bottom">

                <div className="dashboard-section">

                    <h2>
                        Próximas Consultas
                    </h2>

                    <table
                        style={{
                            width: "100%",
                            marginTop:
                                "20px",
                        }}
                    >
                        <thead>
                            <tr>
                                <th>
                                    Paciente
                                </th>
                                <th>
                                    Médico
                                </th>
                                <th>
                                    Horário
                                </th>
                                <th>
                                    Sala
                                </th>
                            </tr>
                        </thead>

                        <tbody>

                            {consultas
                                .slice(0, 5)
                                .map(
                                    (
                                        consulta
                                    ) => (
                                        <tr
                                            key={
                                                consulta.id
                                            }
                                        >
                                            <td>
                                                {
                                                    consulta.paciente
                                                }
                                            </td>

                                            <td>
                                                {
                                                    consulta.medico
                                                }
                                            </td>

                                            <td>
                                                {
                                                    consulta.horario
                                                }
                                            </td>

                                            <td>
                                                {
                                                    consulta.sala
                                                }
                                            </td>
                                        </tr>
                                    )
                                )}

                        </tbody>
                    </table>

                </div>

                <ConsultasStatusChart
                    consultas={
                        consultas
                    }
                />

            </div>

        </div>
    );
}

export default Dashboard;