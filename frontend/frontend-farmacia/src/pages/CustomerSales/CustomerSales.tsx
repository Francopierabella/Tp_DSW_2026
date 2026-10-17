import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getSalesByCustomer } from "../../services/sale.service";
import { getSaleItemsBySale } from "../../services/saleItem.service";
import type { SaleResponse } from "../../types/sale";
import type { SaleItemResponse } from "../../types/saleItem";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./CustomerSales.css";

export default function CustomerSales() {
    const { user, role, token } = useAuth();
    const navigate = useNavigate();

    const [sales, setSales] = useState<SaleResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Filtros
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    // Modal de detalle de compra
    const [saleToView, setSaleToView] = useState<SaleResponse | null>(null);
    const [saleItems, setSaleItems] = useState<SaleItemResponse[]>([]);
    const [loadingItems, setLoadingItems] = useState(false);

    useEffect(() => {
        if (!user || role !== "CUSTOMER" || !token) {
            navigate("/login");
            return;
        }

        async function loadCustomerSales() {
            try {
                setLoading(true);
                setError("");
                const data = await getSalesByCustomer(user!.id, token!);
                // Si el service devuelve data directamente o dentro de .data
                console.log("Respuesta de APi   ", data);
                setSales(Array.isArray(data) ? data : (data?.data ?? []));
            } catch (err: any) {
                console.error(err);
                setError(err.message || "No se pudieron cargar tus compras");
            } finally {
                setLoading(false);
            }
        }

        loadCustomerSales();
    }, [user, role, token, navigate]);

    const handleViewSale = async (sale: SaleResponse) => {
        try {
            setError("");
            setLoadingItems(true);
            setSaleToView(sale);
            const items = await getSaleItemsBySale(sale.id);
            setSaleItems(items);
        } catch (err: any) {
            setError(err.message || "Error al obtener el detalle de la compra");
        } finally {
            setLoadingItems(false);
        }
    };

    const handleClearFilters = () => {
        setStatusFilter("ALL");
        setDateFrom("");
        setDateTo("");
    };

    const filteredSales = sales.filter((sale) => {
        const matchesStatus =
            statusFilter === "ALL" || sale.status === statusFilter;

        const saleDate = new Date(sale.date);
        const matchesDateFrom =
            !dateFrom || saleDate >= new Date(`${dateFrom}T00:00:00`);
        const matchesDateTo =
            !dateTo || saleDate <= new Date(`${dateTo}T23:59:59`);

        return matchesStatus && matchesDateFrom && matchesDateTo;
    });
    console.log(filteredSales);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "CONFIRMED":
                return <span className="customer-sales-status confirmed">Confirmada</span>;
            case "CANCELLED":
                return <span className="customer-sales-status cancelled">Cancelada</span>;
            case "PENDING":
            default:
                return <span className="customer-sales-status pending">Pendiente</span>;
        }
    };

    return (
        <>
            <Header />

            <div className="customer-sales-page">
                <div className="customer-sales-container">
                    {/* Encabezado */}
                    <div className="customer-sales-header">
                        <div className="customer-sales-header-info">
                            <Link to="/profile" className="customer-sales-back-button">
                                ← Volver al perfil
                            </Link>
                            <h1>Mis Compras</h1>
                            <p>Consultá el historial y el estado de todos tus pedidos realizados.</p>
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="customer-sales-filters">
                        <div className="customer-sales-filter">
                            <label htmlFor="customer-status-filter">Estado</label>
                            <select
                                id="customer-status-filter"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="ALL">Todos los estados</option>
                                <option value="PENDING">Pendientes</option>
                                <option value="CONFIRMED">Confirmadas</option>
                                <option value="CANCELLED">Canceladas</option>
                            </select>
                        </div>

                        <div className="customer-sales-filter">
                            <label htmlFor="customer-date-from">Desde</label>
                            <input
                                id="customer-date-from"
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                            />
                        </div>

                        <div className="customer-sales-filter">
                            <label htmlFor="customer-date-to">Hasta</label>
                            <input
                                id="customer-date-to"
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                            />
                        </div>

                        <button
                            type="button"
                            className="customer-sales-clear-button"
                            onClick={handleClearFilters}
                        >
                            Limpiar filtros
                        </button>
                    </div>

                    {/* Errores */}
                    {error && <p className="customer-sales-error">{error}</p>}

                    {/* Tabla de pedidos */}
                    {loading ? (
                        <div className="customer-sales-loading">
                            <p>Cargando tus compras...</p>
                        </div>
                    ) : (
                        <div className="customer-sales-table-container">
                            <table className="customer-sales-table">
                                <thead>
                                    <tr>
                                        <th>N° Orden</th>
                                        <th>Fecha</th>
                                        <th>Total</th>
                                        <th>Método de Pago</th>
                                        <th>Entrega</th>
                                        <th>Estado</th>
                                        <th>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSales.map((sale) => (
                                        <tr key={sale.id}>
                                            <td>
                                                <strong>#{sale.id}</strong>
                                            </td>
                                            <td>
                                                {new Date(sale.date).toLocaleDateString("es-AR")}
                                            </td>
                                            <td>
                                                <strong className="customer-sales-amount">
                                                    ${sale.totalAmount.toLocaleString("es-AR")}
                                                </strong>
                                            </td>
                                            <td>{sale.paymentMethod}</td>
                                            <td>{sale.deliveryMethod}</td>
                                            <td>{getStatusBadge(sale.status)}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="customer-sales-view-button"
                                                    onClick={() => handleViewSale(sale)}
                                                >
                                                    Ver detalle
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredSales.length === 0 && (
                                <div className="customer-sales-empty">
                                    <p>No se encontraron compras con los filtros seleccionados.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Detalle de la Compra */}
            {saleToView && (
                <div className="sale-detail-overlay" onClick={() => setSaleToView(null)}>
                    <div
                        className="sale-detail-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sale-detail-header">
                            <h2>Detalle de Compra #{saleToView.id}</h2>
                            <button
                                type="button"
                                className="sale-detail-close"
                                onClick={() => setSaleToView(null)}
                            >
                                ×
                            </button>
                        </div>

                        <div className="sale-detail-content">
                            <div className="sale-detail-row">
                                <span>Fecha:</span>
                                <strong>
                                    {new Date(saleToView.date).toLocaleDateString("es-AR")}
                                </strong>
                            </div>

                            <div className="sale-detail-row">
                                <span>Método de pago:</span>
                                <strong>{saleToView.paymentMethod}</strong>
                            </div>

                            <div className="sale-detail-row">
                                <span>Método de entrega:</span>
                                <strong>{saleToView.deliveryMethod}</strong>
                            </div>

                            <div className="sale-detail-row">
                                <span>Estado del pedido:</span>
                                <div>{getStatusBadge(saleToView.status)}</div>
                            </div>

                            {/* Lista de productos */}
                            <div className="sale-detail-products">
                                <h3>Productos adquiridos</h3>

                                {loadingItems ? (
                                    <p>Cargando productos...</p>
                                ) : saleItems.length === 0 ? (
                                    <p>No se encontraron productos para esta compra.</p>
                                ) : (
                                    saleItems.map((item) => (
                                        <div key={item.id} className="sale-detail-product">
                                            <div>
                                                <strong>{item.product.name}</strong>
                                                <span>Marca: {item.product.brand}</span>
                                            </div>
                                            <div>
                                                <span>{item.quantity} u. × ${item.unitPrice.toLocaleString("es-AR")}</span>

                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="sale-detail-total">
                                <span>Total abonado:</span>
                                <strong>${saleToView.totalAmount.toLocaleString("es-AR")}</strong>
                            </div>
                        </div>

                        <div className="sale-detail-footer">
                            <button
                                type="button"
                                className="sale-detail-close-button"
                                onClick={() => setSaleToView(null)}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}
