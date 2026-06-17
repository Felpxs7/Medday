import { useEffect, useState } from "react";
import {
    listarPacientes,
    salvarPacientes,
} from "../../services/pacienteService";
import Modal from "../../components/Modal/Modal";

function Pacientes() {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");

    const [pacientes, setPacientes] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    const [modalAberto, setModalAberto] =
    useState(false);

    const [pacienteEditando, setPacienteEditando] =
    useState(null);

    useEffect(() => {
        setPacientes(listarPacientes());
    }, []);

    function adicionarPaciente(e) {
        e.preventDefault();

        if (!nome || !telefone) {
            alert("Preencha todos os campos.");
            return;
        }

        const novoPaciente = {
            id: Date.now(),
            nome,
            telefone,
        };

        const novaLista = [
            ...pacientes,
            novoPaciente,
        ];

        setPacientes(novaLista);

        salvarPacientes(novaLista);

        setNome("");
        setTelefone("");
    }

    function excluirPaciente(id) {
        const novaLista = pacientes.filter(
            paciente => paciente.id !== id
        );

        setPacientes(novaLista);

        salvarPacientes(novaLista);
    }

    function abrirEdicao(paciente) {
        setPacienteEditando({ ...paciente });

        setModalAberto(true);
    }

    function salvarEdicao() {
    const novaLista = pacientes.map(
        (paciente) =>
            paciente.id === pacienteEditando.id
                ? pacienteEditando
                : paciente
        );

        setPacientes(novaLista);

        salvarPacientes(novaLista);

        setModalAberto(false);

        setPacienteEditando(null);
    }
    const pacientesFiltrados = pacientes.filter(
    (paciente) =>
        paciente.nome
            .toLowerCase()
            .includes(
                pesquisa.toLowerCase()
            ) ||
        paciente.telefone.includes(
            pesquisa
        )
    );

    return (
        <div>

            <h1>Pacientes</h1>

            <form onSubmit={adicionarPaciente}>

                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) =>
                        setNome(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) =>
                        setTelefone(e.target.value)
                    }
                />

                <button type="submit">
                    Cadastrar
                </button>

            </form>

            <hr />

            <h2>Pacientes cadastrados</h2>
            <input
                type="text"
                placeholder="🔍 Pesquisar paciente..."
                value={pesquisa}
                onChange={(e) =>
                    setPesquisa(e.target.value)
                }
                style={{
                    width: "100%",
                    padding: "12px",
                    marginBottom: "20px",
                    borderRadius: "10px",
                    border: "1px solid #CBD5E1",
                }}
            />

            {pacientesFiltrados.length === 0 ? (
                <p>Nenhum paciente cadastrado.</p>
            ) : (
               pacientesFiltrados.map((paciente) => (
                    <div
                        key={paciente.id}
                        style={{
                            background: "white",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "10px",
                        }}
                    >
                        <p>
                            <strong>Nome:</strong>{" "}
                            {paciente.nome}
                        </p>

                        <p>
                            <strong>Telefone:</strong>{" "}
                            {paciente.telefone}
                        </p>
                        <button
                                onClick={() =>
                                    abrirEdicao(paciente)
                                }
                            >
                                Editar
                        </button>

                        <button
                            onClick={() =>
                                excluirPaciente(
                                    paciente.id
                                )
                            }
                        >
                            Excluir
                        </button>

                    </div>
                ))
            )}
            <Modal
                aberto={modalAberto}
                titulo="Editar Paciente"
                onClose={() =>
                    setModalAberto(false)
                }
                >
                {pacienteEditando && (
                    <div className="form-grid">

                        <input
                            type="text"
                            value={
                                pacienteEditando.nome
                            }
                            onChange={(e) =>
                                setPacienteEditando({
                                    ...pacienteEditando,
                                    nome:
                                        e.target.value,
                                })
                            }
                        />

                        <input
                            type="text"
                            value={
                                pacienteEditando.telefone
                            }
                            onChange={(e) =>
                                setPacienteEditando({
                                    ...pacienteEditando,
                                    telefone:
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

        </div>
    );
}

export default Pacientes;