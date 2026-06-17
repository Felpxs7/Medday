import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">

            <div className="header-logo">
                <h1>Medday</h1>
                <span>Gestão Médica</span>
            </div>

            <div className="header-search">
                <input
                    type="text"
                    placeholder="🔍 Buscar pacientes, médicos ou consultas..."
                />
            </div>

            <div className="header-actions">

                <button
                    className="notification-btn"
                    title="Notificações"
                >
                    🔔
                </button>

                <button
                    className="new-appointment-btn"
                    onClick={() =>
                        navigate("/agenda")
                    }
                >
                    + Novo Agendamento
                </button>

                <div className="user-avatar">
                    MD
                </div>

            </div>

        </header>
    );
}

export default Header;