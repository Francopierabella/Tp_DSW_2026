
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

type RegistrationType = "customer" | "manager" | null;

export default function Register() {
    const navigate = useNavigate();

    const [registrationType, setRegistrationType] =
        useState<RegistrationType>(null);

    const handleSelectType = (type: "customer" | "manager") => {
        setRegistrationType(type);
    };

    return (
        <div className="register-page">
            <div className="register-container">

                <div className="register-header">
                    <h1 className="register-title">
                        Crear una cuenta
                    </h1>

                    <p className="register-subtitle">
                        Elegí el tipo de cuenta que querés crear
                    </p>
                </div>

                <div className="register-options">

                    <div className="register-card">
                        <div className="register-card-icon">
                            👤
                        </div>

                        <h2>Cliente</h2>

                        <p>
                            Creá tu cuenta para consultar productos,
                            realizar compras y disfrutar de todos
                            los beneficios de Farmacia Pierabella.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                handleSelectType("customer")
                            }
                            className={
                                registrationType === "customer"
                                    ? "register-card-button selected"
                                    : "register-card-button"
                            }
                        >
                            Crear cuenta
                        </button>
                    </div>

                    {/* MANAGER */}
                    <div className="register-card">
                        <div className="register-card-icon">
                            👨‍💼
                        </div>

                        <h2>Manager</h2>

                        <p>
                            Solicitá una cuenta de Manager para
                            gestionar productos, ventas, compras
                            y otras funciones de la farmacia.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                handleSelectType("manager")
                            }
                            className={
                                registrationType === "manager"
                                    ? "register-card-button selected"
                                    : "register-card-button"
                            }
                        >
                            Solicitar acceso
                        </button>
                    </div>

                </div>

                {registrationType && (
                    <div className="register-selection">
                        <p>
                            Seleccionaste{" "}
                            <strong>
                                {registrationType === "customer"
                                    ? "Cliente"
                                    : "Manager"}
                            </strong>
                        </p>

                        <button
                            type="button"
                            className="register-continue-button"
                            onClick={() =>
                                navigate(
                                    registrationType === "customer"
                                        ? "/register/customer"
                                        : "/register/manager"
                                )
                            }
                        >
                            Continuar
                        </button>
                    </div>
                )}

                <div className="register-login">
                    <span>¿Ya tenés una cuenta?</span>

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
