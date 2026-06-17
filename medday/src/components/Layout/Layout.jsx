import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                <h2>🏥 Medday</h2>
                <span>Gestão Médica</span>
            </div>

            <div className="sidebar-section">
                <span className="sidebar-title">
                    MENU
                </span>

                <nav>

                    <NavLink to="/">
                        📊 Dashboard
                    </NavLink>

                    <NavLink to="/agenda">
                        📅 Agenda
                    </NavLink>

                    <NavLink to="/pacientes">
                        👥 Pacientes
                    </NavLink>

                    <NavLink to="/medicos">
                        👨‍⚕️ Médicos
                    </NavLink>

                    <NavLink to="/relatorios">
                        📈 Relatórios
                    </NavLink>

                </nav>
            </div>

            <div className="sidebar-footer">

                <NavLink to="/configuracoes">
                    ⚙️ Configurações
                </NavLink>

                <a href="#">
                    ❓ Ajuda
                </a>

            </div>

        </aside>
    );
}

export default Sidebar;