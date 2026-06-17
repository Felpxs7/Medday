import "./KpiCard.css";

function KpiCard({
    titulo,
    valor,
    detalhe,
}) {
    return (
        <div className="kpi-card">

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