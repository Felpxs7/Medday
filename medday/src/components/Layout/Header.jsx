import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    return (
        <header className="header">
            <div>
                <h1>Medday</h1>
                <span>Gestão Médica</span>
            </div>

            <input
                type="text"
                placeholder="Pesquisar..."
            />

            <button
                onClick={() =>
                    navigate("/agenda")
                }
            >
                Novo Agendamento
            </button>
        </header>
    );
}

export default Header;