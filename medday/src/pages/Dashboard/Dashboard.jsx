import KpiCard from "../../components/KpiCard/KpiCard";

import { listarPacientes } from "../../services/pacienteService";
import { listarMedicos } from "../../services/medicoService";
import { listarConsultas } from "../../services/consultaService";
import ConsultasStatusChart from "../../components/Charts/ConsultasStatusChart";

function Dashboard() {
    const pacientes = listarPacientes();
    const medicos = listarMedicos();
    const consultas = listarConsultas();

    const hoje = new Date().toISOString().split("T")[0];

    const consultasHoje = consultas.filter(
        (consulta) => consulta.data === hoje
    );

    const consultasConfirmadas = consultas.filter(
        (consulta) =>
            consulta.status === "Confirmado"
    );

    const taxaOcupacao =
        consultas.length === 0
            ? 0
            : Math.round(
                  (consultasConfirmadas.length /
                      consultas.length) *
                      100
              );

    return (
        <div className="dashboard">
            <h1>Dashboard Medday</h1>

            <div className="kpi-container">
                <KpiCard
                    titulo="Pacientes"
                    valor={pacientes.length}
                />

                <KpiCard
                    titulo="Médicos"
                    valor={medicos.length}
                />

                <KpiCard
                    titulo="Consultas Hoje"
                    valor={consultasHoje.length}
                />

                <KpiCard
                    titulo="Consultas Confirmadas"
                    valor={
                        consultasConfirmadas.length
                    }
                />

                <KpiCard
                    titulo="Taxa de Ocupação"
                    valor={`${taxaOcupacao}%`}
                />
                
            </div>
            <div style={{ marginTop: "30px" }}>
    <ConsultasStatusChart
        consultas={consultas}
    />

</div>


</div>
);
}
    

export default Dashboard;