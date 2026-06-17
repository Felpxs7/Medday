function KpiCard({ titulo, valor }) {
    return (
        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,.05)",
                minWidth: "200px",
            }}
        >
            <h3
                style={{
                    color: "#64748B",
                    marginBottom: "10px",
                }}
            >
                {titulo}
            </h3>

            <p
                style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#0F172A",
                    margin: 0,
                }}
            >
                {valor}
            </p>
        </div>
    );
}

export default KpiCard;