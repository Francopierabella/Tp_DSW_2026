
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ManagerConfirmation.css";

interface ManagerRegistrationRequest {
    id: number;
    firstName: string;
    lastName: string;
    e_mail: string;
    status: string;
    createdAt: string;
}

export default function ManagerConfirmation() {
    const { token } = useParams();

    const [request, setRequest] =
        useState<ManagerRegistrationRequest | null>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [processing, setProcessing] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/managerRegistrationRequests/token/${token}`
                );

                const data = await response.json();

                if (!response.ok) {
                    setError(data.message || "Solicitud no encontrada");
                    return;
                }

                setRequest(data);
            } catch (error) {
                console.error(error);
                setError("No se pudo conectar con el servidor");
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchRequest();
        }
    }, [token]);

    const handleDecision = async (
        decision: "approve" | "reject"
    ) => {
        if (!token) return;

        setProcessing(true);
        setError("");
        setMessage("");

        try {
            const response = await fetch(
                `http://localhost:3000/api/managerRegistrationRequests/${decision}/${token}`,
                {
                    method: "POST"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    "No se pudo procesar la solicitud"
                );
                return;
            }

            setMessage(data.message);

            setRequest((current) =>
                current
                    ? {
                        ...current,
                        status:
                            decision === "approve"
                                ? "approved"
                                : "rejected"
                    }
                    : current
            );
        } catch (error) {
            console.error(error);
            setError("No se pudo conectar con el servidor");
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="manager-confirmation-loading">
                Cargando solicitud...
            </div>
        );
    }

    if (error && !request) {
        return (
            <div className="manager-confirmation-page">
                <div className="manager-confirmation-card">
                    <div className="manager-confirmation-header">
                        <div className="manager-confirmation-icon">
                            !
                        </div>

                        <h1 className="manager-confirmation-title">
                            Solicitud no disponible
                        </h1>

                        <p className="manager-confirmation-subtitle">
                            {error}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!request) {
        return (
            <div className="manager-confirmation-loading">
                Solicitud no encontrada
            </div>
        );
    }

    return (
        <div className="manager-confirmation-page">
            <div className="manager-confirmation-card">

                <div className="manager-confirmation-header">
                    <div className="manager-confirmation-icon">
                        ✓
                    </div>

                    <h1 className="manager-confirmation-title">
                        Solicitud de registro
                    </h1>

                    <p className="manager-confirmation-subtitle">
                        Revisá los datos del usuario antes de
                        aprobar o rechazar la solicitud.
                    </p>
                </div>

                <div className="manager-request-info">

                    <div className="manager-request-field">
                        <span className="manager-request-label">
                            Nombre
                        </span>

                        <span className="manager-request-value">
                            {request.firstName}
                        </span>
                    </div>

                    <div className="manager-request-field">
                        <span className="manager-request-label">
                            Apellido
                        </span>

                        <span className="manager-request-value">
                            {request.lastName}
                        </span>
                    </div>

                    <div className="manager-request-field">
                        <span className="manager-request-label">
                            Email
                        </span>

                        <span className="manager-request-value">
                            {request.e_mail}
                        </span>
                    </div>

                    <div className="manager-request-field">
                        <span className="manager-request-label">
                            Estado
                        </span>

                        <span className="manager-request-status">
                            {request.status}
                        </span>
                    </div>

                </div>

                {request.status === "pending" && (
                    <div className="manager-confirmation-actions">

                        <button
                            className="manager-confirm-button"
                            onClick={() =>
                                handleDecision("approve")
                            }
                            disabled={processing}
                        >
                            {processing
                                ? "Procesando..."
                                : "✓ Confirmar Manager"}
                        </button>

                        <button
                            className="manager-reject-button"
                            onClick={() =>
                                handleDecision("reject")
                            }
                            disabled={processing}
                        >
                            {processing
                                ? "Procesando..."
                                : "✕ Rechazar solicitud"}
                        </button>

                    </div>
                )}

                {message && (
                    <p className="manager-confirmation-message">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="manager-confirmation-error">
                        {error}
                    </p>
                )}

            </div>
        </div>
    );
}

