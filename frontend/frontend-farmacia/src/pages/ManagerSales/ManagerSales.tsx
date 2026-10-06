import { useEffect, useState } from "react";
import "./ManagerSales.css";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import type { SaleResponse } from "../../types/sale";
import { getSales, confirmSale, cancelSale } from "../../services/sale.service";
import { getSaleItemsBySale } from "../../services/saleItem.service";
import type { SaleItemResponse } from "../../types/saleItem";
import Header from "../../components/Header/Header";

export default function ManagerSales() {

    const [sales, setSales] = useState<SaleResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [saleItems, setSaleItems] = useState<SaleItemResponse[]>([]);
    const [managerFilter, setManagerFilter] = useState("ALL");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const [saleToConfirm, setSaleToConfirm] =
        useState<SaleResponse | null>(null);

    const [saleToCancel, setSaleToCancel] =
        useState<SaleResponse | null>(null);

    const [saleToView, setSaleToView] =
        useState<SaleResponse | null>(null);


    useEffect(() => {

        async function loadSales() {

            try {

                setLoading(true);
                setError("");

                const sales = await getSales();

                setSales(sales);

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

        const parsedDate = new Date(sale.date);

        const saleDate =
            `${parsedDate.getFullYear()}-${String(parsedDate.getMonth() + 1).padStart(2, "0")}-${String(parsedDate.getDate()).padStart(2, "0")}`;

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

            const updatedSale = await confirmSale(
                saleToConfirm.id
            );

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

            setError(
                "No se pudo confirmar la venta"
            );

        }

    };


    const handleCancelSale = async () => {

        if (!saleToCancel) return;

        try {

            const updatedSale = await cancelSale(
                saleToCancel.id
            );

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

            setError(
                "No se pudo cancelar la venta"
            );

        }

    };
    const handleViewSale = async (sale: SaleResponse) => {
        try {
            setError("");

            const items = await getSaleItemsBySale(sale.id);

            setSaleItems(items);
            setSaleToView(sale);
        } catch (error: any) {
            setError(error.message || "Error al obtener los productos de la venta");
        }
    };

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


    return (
        <>
            <Header />
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
                                        $
                                        {sale.totalAmount.toLocaleString(
                                            "es-AR"
                                        )}
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
                                                    onClick={() =>
                                                        setSaleToConfirm(sale)
                                                    }
                                                >
                                                    Confirmar
                                                </button>

                                                <button
                                                    className="manager-sales-cancel-button"
                                                    onClick={() =>
                                                        setSaleToCancel(sale)
                                                    }
                                                >
                                                    Cancelar
                                                </button>

                                            </div>

                                        ) : (

                                            <button
                                                className="manager-sales-view-button"
                                                onClick={() =>
                                                    handleViewSale(sale)
                                                }
                                            >
                                                Ver
                                            </button>

                                        )}

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>


                    {filteredSales.length === 0 && (

                        <p className="manager-sales-empty">
                            No se encontraron ventas con los filtros seleccionados.
                        </p>

                    )}


                    {saleToConfirm && (

                        <ConfirmModal
                            title="Confirmar venta"
                            message={`¿Estás seguro de que querés confirmar la venta #${saleToConfirm.id}?`}
                            confirmText="Confirmar"
                            danger={false}
                            onConfirm={handleConfirmSale}
                            onCancel={() =>
                                setSaleToConfirm(null)
                            }
                        />

                    )}


                    {saleToCancel && (

                        <ConfirmModal
                            title="Cancelar venta"
                            message={`¿Estás seguro de que querés cancelar la venta #${saleToCancel.id}?`}
                            confirmText="Cancelar venta"
                            danger={true}
                            onConfirm={handleCancelSale}
                            onCancel={() =>
                                setSaleToCancel(null)
                            }
                        />

                    )}


                    {saleToView && (
                        <div className="sale-detail-overlay">
                            <div className="sale-detail-modal">

                                <div className="sale-detail-header">
                                    <h2>Detalle de venta #{saleToView.id}</h2>

                                    <button
                                        className="sale-detail-close"
                                        onClick={() => {
                                            setSaleToView(null);
                                            setSaleItems([]);
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="sale-detail-content">

                                    <div className="sale-detail-row">
                                        <span>Fecha</span>
                                        <strong>
                                            {new Date(
                                                saleToView.date
                                            ).toLocaleDateString("es-AR")}
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
                                        <strong>
                                            {saleToView.paymentMethod}
                                        </strong>
                                    </div>

                                    <div className="sale-detail-row">
                                        <span>Entrega</span>
                                        <strong>
                                            {saleToView.deliveryMethod}
                                        </strong>
                                    </div>

                                    <div className="sale-detail-row">
                                        <span>Estado</span>
                                        <strong>
                                            {saleToView.status}
                                        </strong>
                                    </div>

                                    {/* PRODUCTOS DE LA VENTA */}
                                    <div className="sale-detail-products">
                                        <h3>Productos</h3>

                                        {saleItems.length === 0 ? (
                                            <p>No hay productos asociados a esta venta.</p>
                                        ) : (
                                            saleItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="sale-detail-product"
                                                >
                                                    <div>
                                                        <strong>
                                                            {item.product.name}
                                                        </strong>

                                                        <span>
                                                            {item.product.brand}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span>
                                                            Cantidad: {item.quantity}
                                                        </span>

                                                        <span>
                                                            ${item.unitPrice.toLocaleString("es-AR")} c/u
                                                        </span>

                                                        <strong>
                                                            $
                                                            {(
                                                                item.unitPrice *
                                                                item.quantity
                                                            ).toLocaleString("es-AR")}
                                                        </strong>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>

                                    <div className="sale-detail-total">
                                        <span>Total</span>

                                        <strong>
                                            $
                                            {saleToView.totalAmount.toLocaleString(
                                                "es-AR"
                                            )}
                                        </strong>
                                    </div>

                                </div>

                                <div className="sale-detail-footer">
                                    <button
                                        className="sale-detail-close-button"
                                        onClick={() => {
                                            setSaleToView(null);
                                            setSaleItems([]);
                                        }}
                                    >
                                        Cerrar
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}

                </div>

            </div>
        </>
    );

}
