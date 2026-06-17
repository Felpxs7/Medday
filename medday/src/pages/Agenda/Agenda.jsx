import { useEffect, useState } from "react";

import {
    listarConsultas,
    salvarConsultas,
} from "../../services/consultaService";

import {
    listarPacientes,
} from "../../services/pacienteService";

import {
    listarMedicos,
} from "../../services/medicoService";

import Modal from "../../components/Modal/Modal";

function Agenda() {
    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [consultas, setConsultas] = useState([]);

    const [paciente, setPaciente] = useState("");
    const [medico, setMedico] = useState("");
    const [data, setData] = useState("");
    const [horario, setHorario] = useState("");
    const [sala, setSala] = useState("");

    const [pesquisa, setPesquisa] = useState("");
    const [modalAberto, setModalAberto] = useState(false);

    const [consultaEditando, setConsultaEditando] = useState(null);

    useEffect(() => {
        setPacientes(listarPacientes());
        setMedicos(listarMedicos());
        setConsultas(listarConsultas());
    }, []);

    function abrirEdicao(consulta) {
    setConsultaEditando({ ...consulta });

    setModalAberto(true);
    }
        function salvarEdicao() {
            const novaLista = consultas.map(
                (consulta) =>
                    consulta.id === consultaEditando.id
                        ? consultaEditando
                        : consulta
            );

            setConsultas(novaLista);

            salvarConsultas(novaLista);

            setModalAberto(false);

            setConsultaEditando(null);
        }

    function adicionarConsulta(e) {
        e.preventDefault();

        if (
            !paciente ||
            !medico ||
            !data ||
            !horario ||
            !sala
        ) {
            alert("Preencha todos os campos.");
            return;
        }

        const novaConsulta = {
            id: Date.now(),
            paciente,
            medico,
            data,
            horario,
            sala,
            status: "Confirmado",
        };

        const novaLista = [...consultas, novaConsulta];

        setConsultas(novaLista);
        salvarConsultas(novaLista);

        setPaciente("");
        setMedico("");
        setData("");
        setHorario("");
        setSala("");
    }

    function excluirConsulta(id) {
        const novaLista = consultas.filter(
            (consulta) => consulta.id !== id
        );

        setConsultas(novaLista);
        salvarConsultas(novaLista);
    }

    const consultasFiltradas = consultas.filter(
        (consulta) =>
            consulta.paciente
                .toLowerCase()
                .includes(pesquisa.toLowerCase()) ||
            consulta.medico
                .toLowerCase()
                .includes(pesquisa.toLowerCase())
    );

    return (
        <div>
            <div className="page-header">
                <h1>Agenda Médica</h1>
            </div>

            <form
                onSubmit={adicionarConsulta}
                className="form-grid"
            >
                <select
                    value={paciente}
                    onChange={(e) =>
                        setPaciente(e.target.value)
                    }
                >
                    <option value="">
                        Selecione o paciente
                    </option>

                    {pacientes.map((p) => (
                        <option
                            key={p.id}
                            value={p.nome}
                        >
                            {p.nome}
                        </option>
                    ))}
                </select>

                <select
                    value={medico}
                    onChange={(e) =>
                        setMedico(e.target.value)
                    }
                >
                    <option value="">
                        Selecione o médico
                    </option>

                    {medicos.map((m) => (
                        <option
                            key={m.id}
                            value={m.nome}
                        >
                            {m.nome}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    value={data}
                    onChange={(e) =>
                        setData(e.target.value)
                    }
                />

                <input
                    type="time"
                    value={horario}
                    onChange={(e) =>
                        setHorario(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Sala"
                    value={sala}
                    onChange={(e) =>
                        setSala(e.target.value)
                    }
                />

                <button
                    type="submit"
                    className="primary-button"
                >
                    Agendar Consulta
                </button>
            </form>

            <div className="table-container">
                <div style={{ padding: "20px" }}>
                    <input
                        type="text"
                        placeholder="🔍 Pesquisar paciente ou médico..."
                        value={pesquisa}
                        onChange={(e) =>
                            setPesquisa(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "12px",
                            borderRadius: "10px",
                            border: "1px solid #CBD5E1",
                        }}
                    />
                </div>

                {consultasFiltradas.length === 0 ? (
                    <p style={{ padding: "20px" }}>
                        Nenhuma consulta encontrada.
                    </p>
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
                            {consultasFiltradas.map(
                                (consulta) => (
                                    <tr
                                        key={consulta.id}
                                    >
                                        <td>
                                            {
                                                consulta.data
                                            }
                                        </td>

                                        <td>
                                            {
                                                consulta.horario
                                            }
                                        </td>

                                        <td>
                                            {
                                                consulta.paciente
                                            }
                                        </td>

                                        <td>
                                            {
                                                consulta.medico
                                            }
                                        </td>

                                        <td>
                                            {
                                                consulta.sala
                                            }
                                        </td>

                                        <td>
                                            <span
                                                className={`status ${consulta.status
                                                    .toLowerCase()
                                                    .replace(
                                                        " ",
                                                        "-"
                                                    )}`}
                                            >
                                                {
                                                    consulta.status
                                                }
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                    className="action-button"
                                                    title="Editar"
                                                    onClick={() =>
                                                        abrirEdicao(consulta)
                                                    }
                                                >
                                                    ✏️
                                                </button>

                                            <button
                                                className="action-button"
                                                title="Excluir"
                                                onClick={() =>
                                                    excluirConsulta(
                                                        consulta.id
                                                    )
                                                }
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            <Modal
    aberto={modalAberto}
    titulo="Editar Consulta"
    onClose={() =>
        setModalAberto(false)
    }
>
    {consultaEditando && (
        <div className="form-grid">

            <input
                type="text"
                value={
                    consultaEditando.paciente
                }
                onChange={(e) =>
                    setConsultaEditando({
                        ...consultaEditando,
                        paciente:
                            e.target.value,
                    })
                }
            />

            <input
                type="text"
                value={
                    consultaEditando.medico
                }
                onChange={(e) =>
                    setConsultaEditando({
                        ...consultaEditando,
                        medico:
                            e.target.value,
                    })
                }
            />

            <input
                type="date"
                value={
                    consultaEditando.data
                }
                onChange={(e) =>
                    setConsultaEditando({
                        ...consultaEditando,
                        data:
                            e.target.value,
                    })
                }
            />

            <input
                type="time"
                value={
                    consultaEditando.horario
                }
                onChange={(e) =>
                    setConsultaEditando({
                        ...consultaEditando,
                        horario:
                            e.target.value,
                    })
                }
            />

            <input
                type="text"
                value={
                    consultaEditando.sala
                }
                onChange={(e) =>
                    setConsultaEditando({
                        ...consultaEditando,
                        sala:
                            e.target.value,
                    })
                }
            />

            <button
                className="primary-button"
                onClick={salvarEdicao}
            >
                Salvar Alterações
            </button>

        </div>
    )}
    </Modal>
    <Modal
    aberto={modalAberto}
    titulo="Editar Consulta"
    onClose={() =>
        setModalAberto(false)
    }
>
    {consultaEditando && (
        <div className="form-grid">

            <select
                value={consultaEditando.paciente}
                onChange={(e) =>
                    setConsultaEditando({
                        ...consultaEditando,
                        paciente:
                            e.target.value,
                    })
                }
            >
                {pacientes.map((p) => (
                    <option
                        key={p.id}
                        value={p.nome}
                    >
                        {p.nome}
                    </option>
                ))}
            </select>

            <select
                value={consultaEditando.medico}
                onChange={(e) =>
                    setConsultaEditando({
                        ...consultaEditando,
                        medico:
                            e.target.value,
                    })
                }
            >
                {medicos.map((m) => (
                    <option
                        key={m.id}
                        value={m.nome}
                    >
                        {m.nome}
                    </option>
                ))}
            </select>

            <input
                type="date"
                value={
                    consultaEditando.data
                }
                onChange={(e) =>
                    setConsultaEditando({
                        ...consultaEditando,
                        data:
                            e.target.value,
                    })
                }
            />

            <input
                type="time"
                value={
                    consultaEditando.horario
                }
                onChange={(e) =>
                    setConsultaEditando({
                        ...consultaEditando,
                        horario:
                            e.target.value,
                    })
                }
            />

            <input
                type="text"
                value={
                    consultaEditando.sala
                }
                onChange={(e) =>
                    setConsultaEditando({
                        ...consultaEditando,
                        sala:
                            e.target.value,
                    })
                }
            />

            <select
                value={
                    consultaEditando.status
                }
                onChange={(e) =>
                    setConsultaEditando({
                        ...consultaEditando,
                        status:
                            e.target.value,
                    })
                }
            >
                <option value="Confirmado">
                    Confirmado
                </option>

                <option value="Em atendimento">
                    Em atendimento
                </option>

                <option value="Finalizado">
                    Finalizado
                </option>

                <option value="Cancelado">
                    Cancelado
                </option>
            </select>

            <button
                className="primary-button"
                onClick={salvarEdicao}
            >
                Salvar Alterações
            </button>

        </div>
    )}
</Modal>
        </div>
    );
}

export default Agenda;