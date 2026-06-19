import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/auth";

import "./Login.css";

export default function Login() {

    const navigate = useNavigate();

    const [email,setEmail] = useState("");

    const [senha,setSenha] = useState("");

    const [erro,setErro] = useState("");

    function entrar(e){

        e.preventDefault();

        if(login(email,senha)){

            navigate("/");

        }else{

            setErro("Email ou senha inválidos.");

        }

    }

    return(

        <div className="login">

            <div className="login-card">

                <h1>MEDDAY</h1>

                <h3>Sistema Hospitalar</h3>

                <form onSubmit={entrar}>

                    <input
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e)=>setSenha(e.target.value)}
                    />

                    {erro && <p>{erro}</p>}

                    <button>

                        Entrar

                    </button>

                </form>

            </div>

        </div>

    );

}