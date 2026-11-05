import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import type { Customer } from "../../types/customer";
import "./ManagerCustomer.css"
import { activateCustomer, desactivateCustomer, getCustomers } from "../../services/customer.service";
import { getSales } from "../../services/sale.service";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

interface CustomerWithTotalPurchases extends Customer {
    totalPurchases: number;
}

export default function ManagerCustomers() {
    const [customers, setCustomers] = useState<CustomerWithTotalPurchases[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [stateFilter, setStateFilter] = useState<"ALL" | true | false>("ALL");
    const [minPurchases, setminPurchases] = useState(0);
    const [customerToActive, setCustomerToActive] = useState<Customer | null>(null);
    const [customerToDesactivate, setCustomerToDesactivate] = useState<Customer | null>(null)

    useEffect(() => {
        async function loadData() {
            try {
                setLoading(true);
                const [customersData, salesData] = await Promise.all([
                    getCustomers(),
                    getSales()
                ]);
                const customersWithPurchases: CustomerWithTotalPurchases[] = customersData.map(
                    (customer) => {
                        const salesFromThisCustomer = salesData.filter((sale) => sale.customer.id === customer.id && sale.status === "CONFIRMED").length;
                        return {
                            ...customer, totalPurchases: salesFromThisCustomer
                        }
                    }
                )
                setCustomers(customersWithPurchases);
            } catch (error) {
                console.error(error);
                setError("No se pudieron cargar los productos");
            } finally {
                setLoading(false);

            }
        }
        loadData();
    }, []);



    const filteredCustomers = customers.filter((customer) => {
        const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
        const matchesName = fullName.includes(name.toLowerCase());
        const matchesState = stateFilter === "ALL" || customer.isActive === stateFilter;
        const matchesPurchases = customer.totalPurchases >= minPurchases;
        return matchesName && matchesState && matchesPurchases
    })

    async function handleActiveCustomer() {
        if (!customerToActive) return;

        try {
            await activateCustomer(customerToActive.id);
            setCustomers((prevCustomers) =>
                prevCustomers.map((customer) =>
                    customer.id === customerToActive.id
                        ? { ...customer, isActive: true }
                        : customer
                )
            );
            setCustomerToActive(null);
            setError("");
        } catch (err) {
            console.error(err);
            setError("No se pudo activar el cliente");
        }
    }
    async function handleDesactiveCustomer() {
        if (!customerToDesactivate) return;

        try {
            await desactivateCustomer(customerToDesactivate.id);
            setCustomers((prevCustomers) =>
                prevCustomers.map((customer) =>
                    customer.id === customerToDesactivate.id
                        ? { ...customer, isActive: false }
                        : customer
                )
            );

            setCustomerToDesactivate(null);
            setError("");
        } catch (err) {
            console.error(err);
            setError("No se pudo activar el cliente");
        }
    }

    return (
        <>
            <Header />

            <div className="manager-customers-page">
                <div className="manager-customers-container">

                    <div className="manager-customers-header">
                        <h1>Gestión de Clientes</h1>
                        <p>Administrá los clientes registrados y su estado en el sistema.</p>
                    </div>

                    {error && <p className="manager-customers-error">{error}</p>}

                    <div className="manager-customers-filters">

                        <div className="manager-customers-filter">
                            <label htmlFor="name-filter">Nombre o Apellido</label>
                            <input
                                id="name-filter"
                                type="text"
                                placeholder="Buscar cliente..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Filtro por Estado */}
                        <div className="manager-customers-filter">
                            <label htmlFor="state-filter">Estado</label>
                            <select
                                id="state-filter"
                                value={stateFilter === "ALL" ? "ALL" : stateFilter ? "ACTIVE" : "INACTIVE"}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setStateFilter(val === "ALL" ? "ALL" : val === "ACTIVE");
                                }}
                            >
                                <option value="ALL">Todos</option>
                                <option value="ACTIVE">Activos</option>
                                <option value="INACTIVE">Inactivos</option>
                            </select>
                        </div>

                        {/* Filtro por Compras Mínimas */}
                        <div className="manager-customers-filter">
                            <label htmlFor="purchases-filter">Compras mínimas</label>
                            <input
                                id="purchases-filter"
                                type="number"
                                min="0"
                                placeholder="Ej: 1"
                                value={minPurchases}
                                onChange={(e) => setminPurchases(Number(e.target.value))}
                            />
                        </div>

                        {/* Limpiar filtros */}
                        <button
                            className="manager-customers-clear-button"
                            onClick={() => {
                                setName("");
                                setStateFilter("ALL");
                                setminPurchases(0);
                            }}
                        >
                            Limpiar filtros
                        </button>
                    </div>

                    {loading ? (
                        <p className="manager-customers-loading">Cargando clientes...</p>
                    ) : filteredCustomers.length === 0 ? (
                        <p className="manager-customers-empty">
                            No se encontraron clientes con los filtros seleccionados.
                        </p>
                    ) : (
                        <div className="manager-customers-table-container">
                            <table className="manager-customers-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellido</th>
                                        <th>DNI</th>
                                        <th>Total de Compras</th>
                                        <th>Estado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCustomers.map((customer) => (
                                        <tr key={customer.id}>
                                            <td>{customer.id}</td>
                                            <td>{customer.firstName}</td>
                                            <td>{customer.lastName}</td>
                                            <td>{customer.dni}</td>
                                            <td>{customer.totalPurchases}</td>
                                            <td>
                                                <span className={`status-badge ${customer.isActive ? "active" : "inactive"}`}>
                                                    {customer.isActive ? "Activo" : "Inactivo"}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="manager-customers-actions">
                                                    {customer.isActive ? (
                                                        <button
                                                            className="btn-deactivate"
                                                            onClick={() => setCustomerToDesactivate(customer)}
                                                        >
                                                            Desactivar
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn-activate"
                                                            onClick={() => setCustomerToActive(customer)}
                                                        >
                                                            Activar
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* MODAL PARA ACTIVAR */}
                    {customerToActive && (
                        <ConfirmModal
                            title="Activar cliente"
                            message={`¿Estás seguro de que querés reactivar al cliente ${customerToActive.firstName} ${customerToActive.lastName}?`}
                            confirmText="Activar"
                            danger={false}
                            onConfirm={handleActiveCustomer}
                            onCancel={() => setCustomerToActive(null)}
                        />
                    )}

                    {/* MODAL PARA DESACTIVAR (BAJA LÓGICA) */}
                    {customerToDesactivate && (
                        <ConfirmModal
                            title="Desactivar cliente"
                            message={`¿Estás seguro de que querés dar de baja a ${customerToDesactivate.firstName} ${customerToDesactivate.lastName}?`}
                            confirmText="Desactivar"
                            danger={true}
                            onConfirm={handleDesactiveCustomer}
                            onCancel={() => setCustomerToDesactivate(null)}
                        />
                    )}

                </div>
            </div>

            <Footer />
        </>
    );
}