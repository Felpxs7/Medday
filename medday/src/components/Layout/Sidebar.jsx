import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">
            <h2>Medday</h2>

            <nav>
                <NavLink to="/">Dashboard</NavLink>

                <NavLink to="/agenda">Agenda</NavLink>

                <NavLink to="/pacientes">Pacientes</NavLink>

                <NavLink to="/medicos">Médicos</NavLink>

                <NavLink to="/relatorios">Relatórios</NavLink>

                <NavLink to="/configuracoes">
                    Configurações
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;