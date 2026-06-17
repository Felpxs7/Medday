import "./KpiCard.css";

function KpiCard({
    titulo,
    valor,
    detalhe,
    cor = "azul",
}) {
    return (
        <div className={`kpi-card ${cor}`}>

            <div className="kpi-title">
                {titulo}
            </div>

            <div className="kpi-value">
                {valor}
            </div>

            {detalhe && (
                <div className="kpi-footer">
                    {detalhe}
                </div>
            )}

        </div>
    );
}

export default KpiCard;