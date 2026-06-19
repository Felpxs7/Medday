import { useEffect, useState } from "react";

import {
    listarConsultas,
    criarConsulta,
    atualizarConsulta,
    deletarConsulta,
} from "../../services/consultaService";

import { listarPacientes } from "../../services/pacienteService";
import { listarMedicos } from "../../services/medicoService";

import Modal from "../../components/Modal/Modal";

function Agenda() {
    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [consultas, setConsultas] = useState([]);

    const [pacienteId, setPacienteId] = useState("");
    const [medicoId, setMedicoId] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");
    const [sala, setSala] = useState("");

    const [pesquisa, setPesquisa] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [consultaEditando, setConsultaEditando] = useState(null);

    useEffect(() => {
        carregarTudo();
    }, []);

    async function carregarTudo() {
        try {
            const [dadosPacientes, dadosMedicos, dadosConsultas] = await Promise.all([
                listarPacientes(),
                listarMedicos(),
                listarConsultas(),
            ]);
            setPacientes(dadosPacientes);
            setMedicos(dadosMedicos);
            setConsultas(dadosConsultas);
        } catch (erro) {
            console.error("Erro ao carregar dados da agenda:", erro);
            alert("Não foi possível carregar a agenda.");
        }
    }

    async function adicionarConsulta(e) {
        e.preventDefault();

        if (!pacienteId || !medicoId || !data || !hora || !sala) {
            alert("Preencha todos os campos.");
            return;
        }

        const novaConsulta = {
            pacienteId: Number(pacienteId),
            medicoId: Number(medicoId),
            data,
            hora,
            sala: Number(sala),
        };

        try {
            await criarConsulta(novaConsulta);
            await carregarTudo();

            setPacienteId("");
            setMedicoId("");
            setData("");
            setHora("");
            setSala("");
        } catch (erro) {
            console.error("Erro ao agendar consulta:", erro);
            alert(erro.message || "Erro ao agendar consulta.");
        }
    }

    async function excluirConsulta(id) {
        try {
            await deletarConsulta(id);
            await carregarTudo();
        } catch (erro) {
            console.error("Erro ao excluir consulta:", erro);
            alert("Erro ao excluir consulta.");
        }
    }

    function abrirEdicao(consulta) {
        setConsultaEditando({
            id: consulta.id,
            pacienteId: consulta.pacienteId,
            medicoId: consulta.medicoId,
            data: consulta.data,
            hora: consulta.hora,
            sala: consulta.sala,
            status: consulta.status,
        });
        setModalAberto(true);
    }

    async function salvarEdicao() {
        try {
            await atualizarConsulta(consultaEditando.id, {
                pacienteId: Number(consultaEditando.pacienteId),
                medicoId: Number(consultaEditando.medicoId),
                data: consultaEditando.data,
                hora: consultaEditando.hora,
                sala: Number(consultaEditando.sala),
            });
            await carregarTudo();

            setModalAberto(false);
            setConsultaEditando(null);
        } catch (erro) {
            console.error("Erro ao atualizar consulta:", erro);
            alert(erro.message || "Erro ao atualizar consulta.");
        }
    }

    const consultasFiltradas = consultas.filter(
        (consulta) =>
            consulta.pacienteNome?.toLowerCase().includes(pesquisa.toLowerCase()) ||
            consulta.medicoNome?.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <div>
            <div className="page-header">
                <h1>Agenda Médica</h1>
            </div>

            <form onSubmit={adicionarConsulta} className="form-grid">
                <select value={pacienteId} onChange={(e) => setPacienteId(e.target.value)}>
                    <option value="">Selecione o paciente</option>
                    {pacientes.map((p) => (
                        <option key={p.id} value={p.id}>{p.nome}</option>
                    ))}
                </select>

                <select value={medicoId} onChange={(e) => setMedicoId(e.target.value)}>
                    <option value="">Selecione o médico</option>
                    {medicos.map((m) => (
                        <option key={m.id} value={m.id}>{m.nome}</option>
                    ))}
                </select>

                <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
                <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />
                <input
                    type="text"
                    placeholder="Sala"
                    value={sala}
                    onChange={(e) => setSala(e.target.value)}
                />

                <button type="submit" className="primary-button">
                    Agendar Consulta
                </button>
            </form>

            <div className="table-container">
                <div style={{ padding: "20px" }}>
                    <input
                        type="text"
                        placeholder="🔍 Pesquisar paciente ou médico..."
                        value={pesquisa}
                        onChange={(e) => setPesquisa(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                        }}
                    />
                </div>

                {consultasFiltradas.length === 0 ? (
                    <p style={{ padding: "20px" }}>Nenhuma consulta encontrada.</p>
                ) : (
                    <table>
                        <thead>
                        <tr>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Paciente</th>
                            <th>Médico</th>
                            <th>Sala</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                        </thead>

                        <tbody>
                        {consultasFiltradas.map((consulta) => (
                            <tr key={consulta.id}>
                                <td>{consulta.data}</td>
                                <td>{consulta.hora}</td>
                                <td>{consulta.pacienteNome}</td>
                                <td>{consulta.medicoNome}</td>
                                <td>{consulta.sala}</td>
                                <td>
                                        <span
                                            className={`status ${consulta.status?.toLowerCase().replace("_", "-")}`}
                                        >
                                            {consulta.status}
                                        </span>
                                </td>
                                <td>
                                    <button
                                        className="action-button"
                                        title="Editar"
                                        onClick={() => abrirEdicao(consulta)}
                                    >
                                        ✏️
                                    </button>

                                    <button
                                        className="action-button"
                                        title="Excluir"
                                        onClick={() => excluirConsulta(consulta.id)}
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Modal
                aberto={modalAberto}
                titulo="Editar Consulta"
                onClose={() => setModalAberto(false)}
            >
                {consultaEditando && (
                    <div className="form-grid">
                        <select
                            value={consultaEditando.pacienteId}
                            onChange={(e) =>
                                setConsultaEditando({ ...consultaEditando, pacienteId: e.target.value })
                            }
                        >
                            {pacientes.map((p) => (
                                <option key={p.id} value={p.id}>{p.nome}</option>
                            ))}
                        </select>

                        <select
                            value={consultaEditando.medicoId}
                            onChange={(e) =>
                                setConsultaEditando({ ...consultaEditando, medicoId: e.target.value })
                            }
                        >
                            {medicos.map((m) => (
                                <option key={m.id} value={m.id}>{m.nome}</option>
                            ))}
                        </select>

                        <input
                            type="date"
                            value={consultaEditando.data}
                            onChange={(e) =>
                                setConsultaEditando({ ...consultaEditando, data: e.target.value })
                            }
                        />

                        <input
                            type="time"
                            value={consultaEditando.hora}
                            onChange={(e) =>
                                setConsultaEditando({ ...consultaEditando, hora: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            value={consultaEditando.sala}
                            onChange={(e) =>
                                setConsultaEditando({ ...consultaEditando, sala: e.target.value })
                            }
                        />

                        <button className="primary-button" onClick={salvarEdicao}>
                            Salvar Alterações
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Agenda;