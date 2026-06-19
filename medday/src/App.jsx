import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";

import PrivateRoute from "./components/PrivateRoute";

import Login from "./pages/Login/Login";

import Dashboard from "./pages/Dashboard/Dashboard";
import Agenda from "./pages/Agenda/Agenda";
import Pacientes from "./pages/Pacientes/Pacientes";
import Medicos from "./pages/Medicos/Medicos";
import Relatorios from "./pages/Relatorios/Relatorios";
import Configuracoes from "./pages/Configuracoes/Configuracoes";

function Sistema(){

    return(

        <Layout>

            <Routes>

                <Route path="/" element={<Dashboard />} />

                <Route path="/agenda" element={<Agenda />} />

                <Route path="/pacientes" element={<Pacientes />} />

                <Route path="/medicos" element={<Medicos />} />

                <Route path="/relatorios" element={<Relatorios />} />

                <Route path="/configuracoes" element={<Configuracoes />} />

            </Routes>

        </Layout>

    );

}

export default function App(){

    return(

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/*"
                    element={
                        <PrivateRoute>

                            <Sistema/>

                        </PrivateRoute>
                    }
                />

            </Routes>

        </BrowserRouter>

    );

}