import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

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
            statusContagem[consulta.status] !==
            undefined
        ) {
            statusContagem[consulta.status]++;
        }
    });

    const data = {
        labels: Object.keys(statusContagem),

        datasets: [
            {
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
                height: "420px",
            }}
        >
            <h2
                style={{
                    marginBottom: "20px",
                }}
            >
                Consultas por Status
            </h2>

            <div
                style={{
                    maxWidth: "320px",
                    margin: "0 auto",
                }}
            >
                <Doughnut
                    data={data}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,

                        cutout: "70%",

                        plugins: {
                            legend: {
                                position:
                                    "bottom",
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default ConsultasStatusChart;