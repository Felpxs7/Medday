import { useEffect, useState } from "react";

function Configuracoes() {
    const [confirmarExclusao, setConfirmarExclusao] =
        useState(true);

    const [dashboardInicial, setDashboardInicial] =
        useState(true);

    const [notificacoes, setNotificacoes] =
        useState(true);

    useEffect(() => {
        const configuracoes = JSON.parse(
            localStorage.getItem("configuracoes")
        );

        if (configuracoes) {
            setConfirmarExclusao(
                configuracoes.confirmarExclusao
            );

            setDashboardInicial(
                configuracoes.dashboardInicial
            );

            setNotificacoes(
                configuracoes.notificacoes
            );
        }
    }, []);

    function salvarConfiguracoes() {
        const configuracoes = {
            confirmarExclusao,
            dashboardInicial,
            notificacoes,
        };

        localStorage.setItem(
            "configuracoes",
            JSON.stringify(configuracoes)
        );

        alert(
            "Configurações salvas com sucesso!"
        );
    }

    return (
        <div>
            <h1>Configurações</h1>

            <div
                style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "16px",
                    marginTop: "20px",
                    boxShadow:
                        "0 4px 20px rgba(0,0,0,.05)",
                }}
            >
                <label
                    style={{
                        display: "block",
                        marginBottom: "15px",
                    }}
                >
                    <input
                        type="checkbox"
                        checked={
                            confirmarExclusao
                        }
                        onChange={(e) =>
                            setConfirmarExclusao(
                                e.target.checked
                            )
                        }
                    />{" "}
                    Confirmar exclusões
                </label>

                <label
                    style={{
                        display: "block",
                        marginBottom: "15px",
                    }}
                >
                    <input
                        type="checkbox"
                        checked={
                            dashboardInicial
                        }
                        onChange={(e) =>
                            setDashboardInicial(
                                e.target.checked
                            )
                        }
                    />{" "}
                    Mostrar Dashboard ao iniciar
                </label>

                <label
                    style={{
                        display: "block",
                        marginBottom: "25px",
                    }}
                >
                    <input
                        type="checkbox"
                        checked={notificacoes}
                        onChange={(e) =>
                            setNotificacoes(
                                e.target.checked
                            )
                        }
                    />{" "}
                    Ativar notificações
                </label>

                <button
                    className="primary-button"
                    onClick={
                        salvarConfiguracoes
                    }
                >
                    Salvar Configurações
                </button>
            </div>
        </div>
    );
}

export default Configuracoes;