
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ManagerRegister.css";

export default function ManagerRegister() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [e_mail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setError("");
        setMessage("");

        if (!firstName.trim()) {
            setError("El nombre es obligatorio");
            return;
        }

        if (!lastName.trim()) {
            setError("El apellido es obligatorio");
            return;
        }

        if (!e_mail.trim()) {
            setError("El email es obligatorio");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(e_mail.trim())) {
            setError("Ingresá un email válido");
            return;
        }

        if (!password.trim()) {
            setError("La contraseña es obligatoria");
            return;
        }

        if (password.trim().length < 6) {
            setError(
                "La contraseña debe tener al menos 6 caracteres"
            );
            return;
        }

        if (!/[A-Z]/.test(password)) {
            setError(
                "La contraseña debe contener al menos una mayúscula"
            );
            return;
        }

        if (!/\d/.test(password)) {
            setError(
                "La contraseña debe contener al menos un número"
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:3000/api/managerRegistrationRequests",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        e_mail: e_mail.trim(),
                        password: password.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    "No se pudo enviar la solicitud"
                );
                return;
            }

            setMessage(
                "Solicitud enviada correctamente. Tu cuenta será creada una vez que la solicitud sea aprobada."
            );

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.error(error);

            setError(
                "No se pudo conectar con el servidor"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="manager-register-page">
            <div className="manager-register-card">

                <div className="manager-register-header">

                    <button
                        type="button"
                        className="manager-register-back"
                        onClick={() => navigate("/register")}
                    >
                        ← Volver
                    </button>

                    <div className="manager-register-icon">
                        👨‍💼
                    </div>

                    <h1>Solicitar cuenta de Manager</h1>

                    <p>
                        Completá tus datos para enviar una
                        solicitud de registro.
                    </p>

                </div>

                <form
                    className="manager-register-form"
                    onSubmit={handleSubmit}
                >

                    <div className="manager-register-row">

                        <div className="manager-register-field">
                            <label htmlFor="firstName">
                                Nombre
                            </label>

                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(event) =>
                                    setFirstName(event.target.value)
                                }
                                placeholder="Ingresá tu nombre"
                            />
                        </div>

                        <div className="manager-register-field">
                            <label htmlFor="lastName">
                                Apellido
                            </label>

                            <input
                                id="lastName"
                                type="text"
                                value={lastName}
                                onChange={(event) =>
                                    setLastName(event.target.value)
                                }
                                placeholder="Ingresá tu apellido"
                            />
                        </div>

                    </div>

                    <div className="manager-register-field">
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

                    <div className="manager-register-field">
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
                            placeholder="Mínimo 6 caracteres"
                        />

                        <span className="manager-register-hint">
                            Debe contener al menos una mayúscula y un número.
                        </span>
                    </div>

                    <div className="manager-register-field">
                        <label htmlFor="confirmPassword">
                            Confirmar contraseña
                        </label>

                        <input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            placeholder="Repetí tu contraseña"
                        />
                    </div>

                    {error && (
                        <p className="manager-register-error">
                            {error}
                        </p>
                    )}

                    {message && (
                        <p className="manager-register-success">
                            {message}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="manager-register-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Enviando solicitud..."
                            : "Enviar solicitud"}
                    </button>

                </form>

                <div className="manager-register-login">
                    <span>
                        ¿Ya tenés una cuenta?
                    </span>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                    >
                        Iniciar sesión
                    </button>
                </div>

            </div>
        </div>
    );
}

