import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [e_mail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {

        event.preventDefault();

        setError("");

        if (!e_mail.trim()) {
            setError("El email es obligatorio");
            return;
        }

        if (!password.trim()) {
            setError("La contraseña es obligatoria");
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:3000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        e_mail: e_mail.trim(),
                        password: password.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Error al iniciar sesión");
                return;
            }

            login(
                data.user,
                data.role,
                data.token
            );

            console.log("Login exitoso:", data);
            navigate("/");

        } catch (error) {

            console.error(error);

            setError("No se pudo conectar con el servidor");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">

                <h1 className="login-title">
                    Iniciar sesión
                </h1>

                <p className="login-subtitle">
                    Ingresá a tu cuenta de Farmacia Pierabella
                </p>

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >

                    <div className="login-field">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={e_mail}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="Ingresá tu email"
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="password">
                            Contraseña
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Ingresá tu contraseña"
                        />
                    </div>

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button
                        className="login-button"
                        type="submit"
                    >
                        Iniciar sesión
                    </button>

                </form>

            </div>
        </div>
    );
}