import { useEffect, useState } from "react";
import "./ManagerSales.css";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";

interface Sale {
    id: number;
    date: string;
    totalAmount: number;
    paymentMethod: string;
    status: string;
    deliveryMethod: string;

    customer: {
        id: number;
        firstName: string;
        lastName: string;
    };

    manager: {
        id: number;
        firstName: string;
        lastName: string;
    };
}

export default function ManagerSales() {

    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [managerFilter, setManagerFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [saleToConfirm, setSaleToConfirm] = useState<Sale | null>(null);
    const [saleToCancel, setSaleToCancel] = useState<Sale | null>(null);
    const [saleToView, setSaleToView] = useState<Sale | null>(null);

    useEffect(() => {

        async function loadSales() {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/sales"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "No se pudieron cargar las ventas"
                    );
                }

                setSales(data);

            } catch (error) {

                console.error(error);

                setError(
                    "No se pudieron cargar las ventas"
                );

            } finally {

                setLoading(false);

            }
        }

        loadSales();

    }, []);

    const filteredSales = sales.filter((sale) => {

        const matchesManager =
            managerFilter === "ALL" ||
            sale.manager.id.toString() === managerFilter;

        const matchesStatus =
            statusFilter === "ALL" ||
            sale.status === statusFilter;

        const saleDate = sale.date.substring(0, 10);

        const matchesDateFrom =
            !dateFrom || saleDate >= dateFrom;

        const matchesDateTo =
            !dateTo || saleDate <= dateTo;

        return (
            matchesManager &&
            matchesStatus &&
            matchesDateFrom &&
            matchesDateTo
        );
    });


    if (loading) {
        return (
            <div className="manager-sales-page">
                <p>Cargando ventas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="manager-sales-page">
                <p className="manager-sales-error">
                    {error}
                </p>
            </div>
        );
    }

    const managers = Array.from(
        new Map(
            sales.map((sale) => [
                sale.manager.id,
                sale.manager
            ])
        ).values()
    );

    const handleConfirmSale = async () => {
        if (!saleToConfirm) return;

        try {
            const response = await fetch(
                `http://localhost:3000/api/sales/${saleToConfirm.id}/confirm`,
                {
                    method: "PATCH"
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo confirmar la venta");
            }

            const updatedSale = await response.json();

            setSales((prevSales) =>
                prevSales.map((sale) =>
                    sale.id === updatedSale.id
                        ? updatedSale
                        : sale
                )
            );

            setSaleToConfirm(null);

        } catch (error) {
            console.error(error);
        }
    };
    const handleCancelSale = async () => {
        if (!saleToCancel) return;

        try {
            const response = await fetch(
                `http://localhost:3000/api/sales/${saleToCancel.id}/cancel`,
                {
                    method: "PATCH"
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo cancelar la venta");
            }

            const updatedSale = await response.json();

            setSales((prevSales) =>
                prevSales.map((sale) =>
                    sale.id === updatedSale.id
                        ? updatedSale
                        : sale
                )
            );

            setSaleToCancel(null);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="manager-sales-page">

            <div className="manager-sales-header">

                <div>
                    <h1>Ventas</h1>

                    <p>
                        Gestioná las ventas de Farmacia Pierabella.
                    </p>
                </div>

            </div>

            <div className="manager-sales-filters">

                <div className="manager-sales-filter">

                    <label htmlFor="manager-filter">
                        Manager
                    </label>

                    <select
                        id="manager-filter"
                        value={managerFilter}
                        onChange={(event) =>
                            setManagerFilter(event.target.value)
                        }
                    >
                        <option value="ALL">
                            Todos
                        </option>

                        {managers.map((manager) => (
                            <option
                                key={manager.id}
                                value={manager.id}
                            >
                                {manager.firstName} {manager.lastName}
                            </option>
                        ))}
                    </select>

                </div>


                <div className="manager-sales-filter">

                    <label htmlFor="status-filter">
                        Estado
                    </label>

                    <select
                        id="status-filter"
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(event.target.value)
                        }
                    >
                        <option value="ALL">
                            Todos
                        </option>

                        <option value="PENDING">
                            Pendiente
                        </option>

                        <option value="CONFIRMED">
                            Confirmada
                        </option>

                        <option value="CANCELLED">
                            Cancelada
                        </option>

                    </select>

                </div>


                <div className="manager-sales-filter">

                    <label htmlFor="date-from">
                        Desde
                    </label>

                    <input
                        id="date-from"
                        type="date"
                        value={dateFrom}
                        onChange={(event) =>
                            setDateFrom(event.target.value)
                        }
                    />

                </div>


                <div className="manager-sales-filter">

                    <label htmlFor="date-to">
                        Hasta
                    </label>

                    <input
                        id="date-to"
                        type="date"
                        value={dateTo}
                        onChange={(event) =>
                            setDateTo(event.target.value)
                        }
                    />

                </div>


                <button
                    className="manager-sales-clear-button"
                    onClick={() => {
                        setManagerFilter("ALL");
                        setStatusFilter("ALL");
                        setDateFrom("");
                        setDateTo("");
                    }}
                >
                    Limpiar filtros
                </button>

            </div>

            <div className="manager-sales-table-container">

                <table className="manager-sales-table">

                    <thead>

                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Cliente</th>
                            <th>Manager</th>
                            <th>Total</th>
                            <th>Pago</th>
                            <th>Entrega</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filteredSales.map((sale) => (

                            <tr key={sale.id}>

                                <td>
                                    {sale.id}
                                </td>

                                <td>
                                    {new Date(
                                        sale.date
                                    ).toLocaleDateString("es-AR")}
                                </td>

                                <td>
                                    {sale.customer.firstName}{" "}
                                    {sale.customer.lastName}
                                </td>

                                <td>
                                    {sale.manager.firstName}{" "}
                                    {sale.manager.lastName}
                                </td>

                                <td>
                                    ${sale.totalAmount.toLocaleString("es-AR")}
                                </td>

                                <td>
                                    {sale.paymentMethod}
                                </td>

                                <td>
                                    {sale.deliveryMethod}
                                </td>

                                <td>
                                    {sale.status}
                                </td>

                                <td>
                                    {sale.status === "PENDING" ? (
                                        <div className="manager-sales-actions">
                                            <button
                                                className="manager-sales-confirm-button"
                                                onClick={() => setSaleToConfirm(sale)}
                                            >
                                                Confirmar
                                            </button>

                                            <button
                                                className="manager-sales-cancel-button"
                                                onClick={() => setSaleToCancel(sale)}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            className="manager-sales-view-button"
                                            onClick={() => setSaleToView(sale)}
                                        >
                                            Ver
                                        </button>
                                    )}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

                {saleToConfirm && (
                    <ConfirmModal
                        title="Confirmar venta"
                        message={`¿Estás seguro de que querés confirmar la venta #${saleToConfirm.id}?`}
                        confirmText="Confirmar"
                        danger={false}
                        onConfirm={handleConfirmSale}
                        onCancel={() => setSaleToConfirm(null)}
                    />
                )}

                {saleToCancel && (
                    <ConfirmModal
                        title="Cancelar venta"
                        message={`¿Estás seguro de que querés cancelar la venta #${saleToCancel.id}?`}
                        confirmText="Cancelar venta"
                        danger={true}
                        onConfirm={handleCancelSale}
                        onCancel={() => setSaleToCancel(null)}
                    />
                )}
                {saleToView && (
                    <div className="sale-detail-overlay">
                        <div className="sale-detail-modal">

                            <div className="sale-detail-header">
                                <h2>Detalle de venta #{saleToView.id}</h2>

                                <button
                                    className="sale-detail-close"
                                    onClick={() => setSaleToView(null)}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="sale-detail-content">

                                <div className="sale-detail-row">
                                    <span>Fecha</span>
                                    <strong>
                                        {new Date(saleToView.date).toLocaleDateString("es-AR")}
                                    </strong>
                                </div>

                                <div className="sale-detail-row">
                                    <span>Cliente</span>
                                    <strong>
                                        {saleToView.customer.firstName}{" "}
                                        {saleToView.customer.lastName}
                                    </strong>
                                </div>

                                <div className="sale-detail-row">
                                    <span>Manager</span>
                                    <strong>
                                        {saleToView.manager.firstName}{" "}
                                        {saleToView.manager.lastName}
                                    </strong>
                                </div>

                                <div className="sale-detail-row">
                                    <span>Método de pago</span>
                                    <strong>{saleToView.paymentMethod}</strong>
                                </div>

                                <div className="sale-detail-row">
                                    <span>Entrega</span>
                                    <strong>{saleToView.deliveryMethod}</strong>
                                </div>

                                <div className="sale-detail-row">
                                    <span>Estado</span>
                                    <strong>{saleToView.status}</strong>
                                </div>

                                <div className="sale-detail-total">
                                    <span>Total</span>
                                    <strong>
                                        ${saleToView.totalAmount.toLocaleString("es-AR")}
                                    </strong>
                                </div>

                            </div>

                            <div className="sale-detail-footer">
                                <button
                                    className="sale-detail-close-button"
                                    onClick={() => setSaleToView(null)}
                                >
                                    Cerrar
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}