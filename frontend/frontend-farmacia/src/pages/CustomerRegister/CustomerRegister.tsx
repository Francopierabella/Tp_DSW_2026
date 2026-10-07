
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getHealthInsurances } from "../../services/healthInsurance.service";
import type { HealthInsurance } from "../../services/healthInsurance.service";
import "./CustomerRegister.css";

export default function CustomerRegister() {
    const navigate = useNavigate();

    const [healthInsurances, setHealthInsurances] =
        useState<HealthInsurance[]>([]);

    const [loadingHealthInsurances, setLoadingHealthInsurances] =
        useState(true);

    const [error, setError] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dni, setDni] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [e_mail, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [healthInsurance, setHealthInsurance] = useState("");

    useEffect(() => {
        const loadHealthInsurances = async () => {
            try {
                const data = await getHealthInsurances();
                setHealthInsurances(data);
            } catch (error) {
                console.error(error);
                setError(
                    "No se pudieron cargar las obras sociales"
                );
            } finally {
                setLoadingHealthInsurances(false);
            }
        };

        loadHealthInsurances();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setError("");

        if (!firstName.trim()) {
            setError("El nombre es obligatorio");
            return;
        }

        if (!lastName.trim()) {
            setError("El apellido es obligatorio");
            return;
        }

        if (!dni.trim()) {
            setError("El DNI es obligatorio");
            return;
        }

        if (!/^\d{8}$/.test(dni.trim())) {
            setError("El DNI debe contener exactamente 8 números");
            return;
        }

        if (!phoneNumber.trim()) {
            setError("El teléfono es obligatorio");
            return;
        }

        if (!address.trim()) {
            setError("La dirección es obligatoria");
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

        try {
            const response = await fetch(
                "http://localhost:3000/api/customers",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        dni: dni.trim(),
                        phoneNumber: phoneNumber.trim(),
                        address: address.trim(),
                        e_mail: e_mail.trim(),
                        password: password.trim(),
                        healthInsurance: healthInsurance
                            ? Number(healthInsurance)
                            : undefined
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    "No se pudo crear la cuenta"
                );
                return;
            }

            console.log("Customer creado:", data);

            navigate("/login");

        } catch (error) {
            console.error(error);

            setError(
                "No se pudo conectar con el servidor"
            );
        }
    };



    return (
        <div className="customer-register-page">
            <div className="customer-register-card">

                <div className="customer-register-header">

                    <button
                        type="button"
                        className="customer-register-back"
                        onClick={() => navigate("/register")}
                    >
                        ← Volver
                    </button>

                    <div className="customer-register-icon">
                        👤
                    </div>

                    <h1>Crear cuenta de cliente</h1>

                    <p>
                        Completá tus datos para crear tu cuenta
                        en Farmacia Pierabella.
                    </p>

                </div>

                <form
                    className="customer-register-form"
                    onSubmit={handleSubmit}
                >

                    <div className="customer-register-row">

                        <div className="customer-register-field">
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

                        <div className="customer-register-field">
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

                    <div className="customer-register-row">

                        <div className="customer-register-field">
                            <label htmlFor="dni">
                                DNI
                            </label>

                            <input
                                id="dni"
                                type="text"
                                inputMode="numeric"
                                maxLength={8}
                                value={dni}
                                onChange={(event) =>
                                    setDni(event.target.value)
                                }
                                placeholder="Ej. 12345678"
                            />
                        </div>

                        <div className="customer-register-field">
                            <label htmlFor="phoneNumber">
                                Teléfono
                            </label>

                            <input
                                id="phoneNumber"
                                type="tel"
                                value={phoneNumber}
                                onChange={(event) =>
                                    setPhoneNumber(event.target.value)
                                }
                                placeholder="Ej. 3411234567"
                            />
                        </div>

                    </div>

                    <div className="customer-register-field">
                        <label htmlFor="address">
                            Dirección
                        </label>

                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(event) =>
                                setAddress(event.target.value)
                            }
                            placeholder="Ingresá tu dirección"
                        />
                    </div>

                    <div className="customer-register-field">
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

                    <div className="customer-register-field">
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

                        <span className="customer-register-hint">
                            Debe contener al menos una mayúscula y un número.
                        </span>
                    </div>

                    <div className="customer-register-field">
                        <label htmlFor="healthInsurance">
                            Obra social
                            <span> (opcional)</span>
                        </label>

                        <select
                            id="healthInsurance"
                            value={healthInsurance}
                            onChange={(event) =>
                                setHealthInsurance(event.target.value)
                            }
                            disabled={loadingHealthInsurances}
                        >
                            <option value="">
                                {loadingHealthInsurances
                                    ? "Cargando obras sociales..."
                                    : "Sin obra social"}
                            </option>

                            {healthInsurances.map(
                                (insurance) => (
                                    <option
                                        key={insurance.id}
                                        value={insurance.id}
                                    >
                                        {insurance.name}
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    {error && (
                        <p className="customer-register-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="customer-register-button"
                    >
                        Crear mi cuenta
                    </button>

                </form>

                <div className="customer-register-login">
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

