import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function ConsultasStatusChart({ consultas }) {

    const statusContagem = {
        Confirmado: 0,
        Cancelado: 0,
        "Em atendimento": 0,
        Finalizado: 0,
    };

    consultas.forEach((consulta) => {
        if (
            statusContagem[
                consulta.status
            ] !== undefined
        ) {
            statusContagem[
                consulta.status
            ]++;
        }
    });

    const data = {
        labels: Object.keys(
            statusContagem
        ),

        datasets: [
            {
                label: "Consultas",

                data: Object.values(
                    statusContagem
                ),

                backgroundColor: [
                    "#22C55E",
                    "#EF4444",
                    "#3B82F6",
                    "#6B7280",
                ],

                borderWidth: 1,
            },
        ],
    };

    return (
        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "16px",
                boxShadow:
                    "0 4px 20px rgba(0,0,0,.05)",
            }}
        >
            <h2>
                Consultas por Status
            </h2>

            <Pie data={data} />
        </div>
    );
}

export default ConsultasStatusChart;