
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getCustomerProfile } from "../../services/customer.service";
import { getHealthInsurances, type HealthInsurance } from "../../services/healthInsurance.service";
import Header from "../../components/Header/Header";
import "./CustomerProfile.css";
import Footer from "../../components/Footer/Footer";

interface CustomerProfile {
    id: number;
    firstName: string;
    lastName: string;
    dni: string;
    phoneNumber: string;
    address: string;
    e_mail: string;
    healthInsurance?: number;
}

export default function CustomerProfile() {
    const { user, role, token } = useAuth();
    const navigate = useNavigate();

    const [customer, setCustomer] =
        useState<CustomerProfile | null>(null);

    const [healthInsurances, setHealthInsurances] =
        useState<HealthInsurance[]>([]);

    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        healthInsurance: ""
    });

    useEffect(() => {
        const loadProfile = async () => {
            if (!user || role !== "CUSTOMER" || !token) {
                setLoading(false);
                return;
            }

            try {
                const [customerData, healthInsuranceData] =
                    await Promise.all([
                        getCustomerProfile(user.id, token),
                        getHealthInsurances()
                    ]);

                setCustomer(customerData);
                setHealthInsurances(healthInsuranceData);

                setFormData({
                    firstName: customerData.firstName,
                    lastName: customerData.lastName,
                    phoneNumber: customerData.phoneNumber,
                    address: customerData.address,
                    healthInsurance:
                        customerData.healthInsurance
                            ? String(customerData.healthInsurance)
                            : ""
                });
            } catch (error) {
                console.error(error);
                setError(
                    "No se pudo cargar la información del perfil"
                );
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [user, role, token]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value
        }));
    };

    const handleCancel = () => {
        if (!customer) return;

        setFormData({
            firstName: customer.firstName,
            lastName: customer.lastName,
            phoneNumber: customer.phoneNumber,
            address: customer.address,
            healthInsurance:
                customer.healthInsurance
                    ? String(customer.healthInsurance)
                    : ""
        });

        setError("");
        setMessage("");
        setEditing(false);
    };

    const handleSave = async () => {
        if (!customer || !token) return;

        setError("");
        setMessage("");

        if (!formData.firstName.trim()) {
            setError("El nombre es obligatorio");
            return;
        }

        if (!formData.lastName.trim()) {
            setError("El apellido es obligatorio");
            return;
        }

        if (!formData.phoneNumber.trim()) {
            setError("El teléfono es obligatorio");
            return;
        }

        if (!formData.address.trim()) {
            setError("La dirección es obligatoria");
            return;
        }

        try {
            setSaving(true);

            const response = await fetch(
                `http://localhost:3000/api/customers/${customer.id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        firstName: formData.firstName.trim(),
                        lastName: formData.lastName.trim(),
                        phoneNumber: formData.phoneNumber.trim(),
                        address: formData.address.trim(),
                        healthInsurance:
                            formData.healthInsurance
                                ? Number(formData.healthInsurance)
                                : undefined
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(
                    data.message ||
                    "No se pudo actualizar el perfil"
                );
                return;
            }

            /*
             * El backend devuelve:
             *
             * {
             *     message: "...",
             *     customerWithThisId: ...
             * }
             */
            const updatedCustomer =
                data.customerWithThisId;

            setCustomer(updatedCustomer);

            setFormData({
                firstName: updatedCustomer.firstName,
                lastName: updatedCustomer.lastName,
                phoneNumber: updatedCustomer.phoneNumber,
                address: updatedCustomer.address,
                healthInsurance:
                    updatedCustomer.healthInsurance
                        ? String(
                            updatedCustomer.healthInsurance
                        )
                        : ""
            });

            setEditing(false);
            setMessage(
                "Perfil actualizado correctamente"
            );
        } catch (error) {
            console.error(error);
            setError(
                "No se pudo conectar con el servidor"
            );
        } finally {
            setSaving(false);
        }
    };

    if (!user || role !== "CUSTOMER") {
        return (
            <div className="customer-profile-page">
                <div className="customer-profile-card">
                    <h1>Acceso no permitido</h1>

                    <p>
                        Esta sección está disponible únicamente
                        para clientes.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="customer-profile-loading">
                Cargando perfil...
            </div>
        );
    }

    if (error && !customer) {
        return (
            <div className="customer-profile-page">
                <div className="customer-profile-card">
                    <h1>
                        No se pudo cargar el perfil
                    </h1>

                    <p>{error}</p>

                    <button
                        onClick={() => navigate("/")}
                    >
                        Volver al inicio
                    </button>
                </div>
            </div>
        );
    }

    if (!customer) {
        return null;
    }

    const healthInsurance =
        healthInsurances.find(
            (insurance) =>
                insurance.id ===
                customer.healthInsurance
        );

    return (
        <>
            <Header />
            <div className="customer-profile-page">
                <div className="customer-profile-card">

                    <div className="customer-profile-header">

                        <div className="customer-profile-avatar">
                            {customer.firstName
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div>
                            <h1>Mi perfil</h1>

                            <p>
                                Administrá la información de tu cuenta
                            </p>
                        </div>

                    </div>

                    {message && (
                        <p className="customer-profile-success">
                            {message}
                        </p>
                    )}

                    {error && (
                        <p className="customer-profile-error">
                            {error}
                        </p>
                    )}

                    <div className="customer-profile-section">

                        <h2>
                            Información personal
                        </h2>

                        <div className="customer-profile-grid">

                            <div className="customer-profile-field">
                                <span>Nombre</span>

                                {editing ? (
                                    <input
                                        name="firstName"
                                        value={
                                            formData.firstName
                                        }
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <strong>
                                        {customer.firstName}
                                    </strong>
                                )}
                            </div>

                            <div className="customer-profile-field">
                                <span>Apellido</span>

                                {editing ? (
                                    <input
                                        name="lastName"
                                        value={
                                            formData.lastName
                                        }
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <strong>
                                        {customer.lastName}
                                    </strong>
                                )}
                            </div>

                            <div className="customer-profile-field">
                                <span>DNI</span>

                                <strong>
                                    {customer.dni}
                                </strong>
                            </div>

                            <div className="customer-profile-field">
                                <span>Email</span>

                                <strong>
                                    {customer.e_mail}
                                </strong>
                            </div>

                        </div>

                    </div>

                    <div className="customer-profile-section">

                        <h2>
                            Información de contacto
                        </h2>

                        <div className="customer-profile-grid">

                            <div className="customer-profile-field">
                                <span>Teléfono</span>

                                {editing ? (
                                    <input
                                        name="phoneNumber"
                                        value={
                                            formData.phoneNumber
                                        }
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <strong>
                                        {customer.phoneNumber}
                                    </strong>
                                )}
                            </div>

                            <div className="customer-profile-field">
                                <span>Dirección</span>

                                {editing ? (
                                    <input
                                        name="address"
                                        value={
                                            formData.address
                                        }
                                        onChange={handleChange}
                                    />
                                ) : (
                                    <strong>
                                        {customer.address}
                                    </strong>
                                )}
                            </div>

                        </div>

                    </div>

                    <div className="customer-profile-section">

                        <h2>
                            Obra social
                        </h2>

                        {editing ? (
                            <select
                                name="healthInsurance"
                                value={
                                    formData.healthInsurance
                                }
                                onChange={handleChange}
                                className="customer-profile-select"
                            >
                                <option value="">
                                    Sin obra social
                                </option>

                                {healthInsurances.map(
                                    (insurance) => (
                                        <option
                                            key={insurance.id}
                                            value={insurance.id}
                                        >
                                            {insurance.name} -{" "}
                                            {
                                                insurance.coveragePercentage
                                            }%
                                        </option>
                                    )
                                )}
                            </select>
                        ) : (
                            <div className="customer-profile-insurance">

                                {healthInsurance ? (
                                    <>
                                        <strong>
                                            {
                                                healthInsurance.name
                                            }
                                        </strong>

                                        <span>
                                            Cobertura:{" "}
                                            {
                                                healthInsurance.coveragePercentage
                                            }
                                            %
                                        </span>
                                    </>
                                ) : (
                                    <span>
                                        No tenés una obra social
                                        asociada.
                                    </span>
                                )}

                            </div>
                        )}

                    </div>

                    <div className="customer-profile-actions">

                        {editing ? (
                            <>
                                <button
                                    type="button"
                                    className="customer-profile-cancel"
                                    onClick={handleCancel}
                                    disabled={saving}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Guardando..."
                                        : "Guardar cambios"}
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                onClick={() => {
                                    setError("");
                                    setMessage("");
                                    setEditing(true);
                                }}
                            >
                                Editar perfil
                            </button>
                        )}

                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}

