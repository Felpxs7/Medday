import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";

import {
    listarMedicos,
    criarMedico,
    atualizarMedico,
    deletarMedico
} from "../../services/medicoService";

function Medicos() {
    const [nome, setNome] = useState("");
    const [especialidade, setEspecialidade] = useState("");

    const [medicos, setMedicos] = useState([]);
    const [pesquisa, setPesquisa] = useState("");

    const [modalAberto, setModalAberto] = useState(false);
    const [medicoEditando, setMedicoEditando] = useState(null);

    useEffect(() => {
        carregarMedicos();
    }, []);

    async function carregarMedicos() {
        try {
            const dados = await listarMedicos();
            setMedicos(dados);
        } catch (erro) {
            console.error("Erro ao carregar médicos:", erro);
            alert("Não foi possível carregar a lista de médicos.");
        }
    }

    async function adicionarMedico(e) {
        e.preventDefault();

        if (!nome || !especialidade) {
            alert("Preencha todos os campos.");
            return;
        }

        const novoMedico = { nome, especialidade };

        try {
            await criarMedico(novoMedico);
            await carregarMedicos();

            setNome("");
            setEspecialidade("");
        } catch (erro) {
            console.error("Erro ao cadastrar médico:", erro);
            alert("Erro ao cadastrar médico.");
        }
    }

    async function excluirMedico(id) {
        try {
            await deletarMedico(id);
            await carregarMedicos();
        } catch (erro) {
            console.error("Erro ao excluir médico:", erro);
            alert("Erro ao excluir médico.");
        }
    }

    function abrirEdicao(medico) {
        setMedicoEditando({ ...medico });
        setModalAberto(true);
    }

    async function salvarEdicao() {
        try {
            await atualizarMedico(medicoEditando.id, medicoEditando);
            await carregarMedicos();

            setModalAberto(false);
            setMedicoEditando(null);
        } catch (erro) {
            console.error("Erro ao atualizar médico:", erro);
            alert("Erro ao atualizar médico.");
        }
    }

    const medicosFiltrados = medicos.filter(
        (medico) =>
            medico.nome.toLowerCase().includes(pesquisa.toLowerCase()) ||
            medico.especialidade.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <div>
            <h1>Médicos</h1>

            <form onSubmit={adicionarMedico}>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Especialidade"
                    value={especialidade}
                    onChange={(e) => setEspecialidade(e.target.value)}
                />

                <button type="submit">Cadastrar</button>
            </form>

            <hr />

            <h2>Médicos cadastrados</h2>

            <input
                type="text"
                placeholder="🔍 Pesquisar médico..."
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

            {medicosFiltrados.length === 0 ? (
                <p>Nenhum médico encontrado.</p>
            ) : (
                medicosFiltrados.map((medico) => (
                    <div
                        key={medico.id}
                        style={{
                            background: "white",
                            padding: "15px",
                            marginBottom: "10px",
                            borderRadius: "10px",
                        }}
                    >
                        <p><strong>Nome:</strong> {medico.nome}</p>
                        <p><strong>Especialidade:</strong> {medico.especialidade}</p>

                        <button onClick={() => abrirEdicao(medico)} style={{ marginRight: "10px" }}>
                            Editar
                        </button>

                        <button onClick={() => excluirMedico(medico.id)}>
                            Excluir
                        </button>
                    </div>
                ))
            )}

            <Modal
                aberto={modalAberto}
                titulo="Editar Médico"
                onClose={() => setModalAberto(false)}
            >
                {medicoEditando && (
                    <div className="form-grid">
                        <input
                            type="text"
                            value={medicoEditando.nome}
                            onChange={(e) =>
                                setMedicoEditando({ ...medicoEditando, nome: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            value={medicoEditando.especialidade}
                            onChange={(e) =>
                                setMedicoEditando({ ...medicoEditando, especialidade: e.target.value })
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

export default Medicos;