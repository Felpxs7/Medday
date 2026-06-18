function Timeline({ consultas }) {
    return (
        <div className="dashboard-section">
            <h2>Timeline de Hoje</h2>

            <div
                style={{
                    marginTop: "20px",
                }}
            >
                {consultas.length === 0 ? (
                    <p>
                        Nenhuma consulta hoje
                    </p>
                ) : (
                    consultas.map(
                        (consulta) => (
                            <div
                                key={
                                    consulta.id
                                }
                                style={{
                                    padding:
                                        "10px",
                                    background:
                                        "#EFF6FF",
                                    borderRadius:
                                        "10px",
                                    marginBottom:
                                        "10px",
                                }}
                            >
                                {consulta.horario}
                                {" - "}
                                {
                                    consulta.medico
                                }
                            </div>
                        )
                    )
                )}
            </div>
        </div>
    );
}

export default Timeline;