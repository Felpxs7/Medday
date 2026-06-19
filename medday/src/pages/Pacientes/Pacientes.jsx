import { useEffect, useState } from "react";
import {
    listarPacientes,
    criarPaciente,
    atualizarPaciente,
    deletarPaciente,
} from "../../services/pacienteService";
import Modal from "../../components/Modal/Modal";

function Pacientes() {
    const [nome, setNome] = useState("");
    const [telefone, setTelefone] = useState("");

    const [pacientes, setPacientes] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    const [modalAberto, setModalAberto] = useState(false);
    const [pacienteEditando, setPacienteEditando] = useState(null);

    useEffect(() => {
        carregarPacientes();
    }, []);

    async function carregarPacientes() {
        try {
            const dados = await listarPacientes();
            setPacientes(dados);
        } catch (erro) {
            console.error("Erro ao carregar pacientes:", erro);
            alert("Não foi possível carregar a lista de pacientes.");
        }
    }

    async function adicionarPaciente(e) {
        e.preventDefault();

        if (!nome || !telefone) {
            alert("Preencha todos os campos.");
            return;
        }

        const novoPaciente = { nome, telefone };

        try {
            await criarPaciente(novoPaciente);
            await carregarPacientes();

            setNome("");
            setTelefone("");
        } catch (erro) {
            console.error("Erro ao cadastrar paciente:", erro);
            alert("Erro ao cadastrar paciente.");
        }
    }

    async function excluirPaciente(id) {
        try {
            await deletarPaciente(id);
            await carregarPacientes();
        } catch (erro) {
            console.error("Erro ao excluir paciente:", erro);
            alert("Erro ao excluir paciente.");
        }
    }

    function abrirEdicao(paciente) {
        setPacienteEditando({ ...paciente });
        setModalAberto(true);
    }

    async function salvarEdicao() {
        try {
            await atualizarPaciente(pacienteEditando.id, pacienteEditando);
            await carregarPacientes();

            setModalAberto(false);
            setPacienteEditando(null);
        } catch (erro) {
            console.error("Erro ao atualizar paciente:", erro);
            alert("Erro ao atualizar paciente.");
        }
    }

    const pacientesFiltrados = pacientes.filter(
        (paciente) =>
            paciente.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
            paciente.telefone.includes(pesquisa)
    );

    return (
        <div>
            <h1>Pacientes</h1>

            <form onSubmit={adicionarPaciente}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </form>

            <hr />

            <h2>Pacientes cadastrados</h2>
            <input
                type="text"
                placeholder="🔍 Pesquisar paciente..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
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
                        <p><strong>Nome:</strong> {paciente.nome}</p>
                        <p><strong>Telefone:</strong> {paciente.telefone}</p>

                        <button onClick={() => abrirEdicao(paciente)}>
                            Editar
                        </button>

                        <button onClick={() => excluirPaciente(paciente.id)}>
                            Excluir
                        </button>
                    </div>
                ))
            )}

            <Modal
                aberto={modalAberto}
                titulo="Editar Paciente"
                onClose={() => setModalAberto(false)}
            >
                {pacienteEditando && (
                    <div className="form-grid">
                        <input
                            type="text"
                            value={pacienteEditando.nome}
                            onChange={(e) =>
                                setPacienteEditando({ ...pacienteEditando, nome: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            value={pacienteEditando.telefone}
                            onChange={(e) =>
                                setPacienteEditando({ ...pacienteEditando, telefone: e.target.value })
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

export default Pacientes;