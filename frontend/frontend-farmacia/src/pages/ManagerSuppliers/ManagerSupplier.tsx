import { useEffect, useMemo, useState } from "react";
import "./ManagerSupplier.css";
import type { Product } from "../../types/product.js";
import type { Supplier } from "../../types/supplier.js";
import type { SupplierProduct } from "../../types/supplierProduct.js";
import type { PurchaseOrder } from "../../types/purchaseOrder.js";
import type { PurchaseOrderItemResponse } from "../../types/purchaseOrderItem.js";
import { getProducts } from "../../services/product.service.js";
import { getSuppliers } from "../../services/suppliers.service.js";
import { getSupplierProductsByProduct } from "../../services/suppliersProduct.service.js";
import { createPurchaseOrder, updatePurchaseOrder, getPurchaseOrders, getPurchaseOrderById } from "../../services/purchaseOrder.service.js";
import { createPurchaseOrderItem, getPurchaseOrderItemsByOrder } from "../../services/purchaseOrderItem.service.js";
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import Toast from "../../components/Toast/Toast.js";

interface PurchaseCartItem {
    product: Product;
    supplier: Supplier;
    unitPrice: number;
    quantity: number;
}

export default function ManagerSuppliers() {
    const [products, setProducts] = useState<Product[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [supplierProducts, setSupplierProducts] = useState<SupplierProduct[]>([]);
    const [confirmingPurchase, setConfirmingPurchase] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
    const [orderItems, setOrderItems] = useState<PurchaseOrderItemResponse[]>([]);
    const [loadingOrderItems, setLoadingOrderItems] = useState<boolean>(false);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingSuppliers, setLoadingSuppliers] = useState(true);
    const [loadingOffers, setLoadingOffers] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>("");
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
    const [loadingPurchaseOrders, setLoadingPurchaseOrders] = useState(true);
    const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [supplierFilter, setSupplierFilter] = useState<string>("");

    const [orderToView, setOrderToView] = useState<PurchaseOrder | null>(null);


    const [purchaseCart, setPurchaseCart] = useState<PurchaseCartItem[]>([]);

    useEffect(() => {
        loadInitialData();
    }, []);

    async function loadInitialData() {
        try {
            setError("");

            const [
                productsData,
                suppliersData,
                purchaseOrdersData
            ] = await Promise.all([
                getProducts(),
                getSuppliers(),
                getPurchaseOrders()
            ]); // para ejecutar promesas en paralelo

            setProducts(productsData);
            setSuppliers(suppliersData);
            setPurchaseOrders(purchaseOrdersData);

        } catch (error) {
            console.error(error);
            setError("No se pudieron cargar los datos.");
        } finally {
            setLoadingProducts(false);
            setLoadingSuppliers(false);
            setLoadingPurchaseOrders(false);
        }
    }

    async function handleProductChange(productId: number | null) {
        setSelectedProduct(productId);
        setSupplierProducts([]);

        if (!productId) {
            return;
        }

        try {
            setLoadingOffers(true);
            setError("");

            const offers = await getSupplierProductsByProduct(productId);

            const sortedOffers = [...offers].sort(
                (a, b) => a.price - b.price
            );

            setSupplierProducts(sortedOffers);
        } catch (error) {
            console.error(error);
            setError("No se pudieron cargar los proveedores del producto.");
        } finally {
            setLoadingOffers(false);
        }
    }

    function getSupplierById(supplierId: number) {
        return suppliers.find(
            (supplier) => supplier.id === supplierId
        );
    }

    function addToPurchaseCart(
        supplierProduct: SupplierProduct
    ) {
        const product = products.find(
            (product) => product.id === selectedProduct
        );

        const supplier = getSupplierById(
            supplierProduct.supplier
        );

        if (!product || !supplier) {
            return;
        }

        setPurchaseCart((currentCart) => {
            const existingItem = currentCart.find(
                (item) =>
                    item.product.id === product.id &&
                    item.supplier.id === supplier.id
            );

            if (existingItem) {
                return currentCart.map((item) =>
                    item.product.id === product.id &&
                        item.supplier.id === supplier.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );
            }

            return [
                ...currentCart,
                {
                    product,
                    supplier,
                    unitPrice: supplierProduct.price,
                    quantity: 1
                }
            ];
        });
    }

    function updateQuantity(
        productId: number,
        supplierId: number,
        quantity: number
    ) {
        if (quantity < 1) {
            return;
        }

        setPurchaseCart((currentCart) =>
            currentCart.map((item) =>
                item.product.id === productId &&
                    item.supplier.id === supplierId
                    ? {
                        ...item,
                        quantity
                    }
                    : item
            )
        );
    }

    function removeFromPurchaseCart(
        productId: number,
        supplierId: number
    ) {
        setPurchaseCart((currentCart) =>
            currentCart.filter(
                (item) =>
                    !(
                        item.product.id === productId &&
                        item.supplier.id === supplierId
                    )
            )
        );
    }

    const totalProducts = purchaseCart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const purchaseTotal = purchaseCart.reduce(
        (total, item) =>
            total + item.unitPrice * item.quantity,
        0
    );

    const selectedProductData = products.find(
        (product) => product.id === selectedProduct
    );

    const cheapestOffer =
        supplierProducts.length > 0
            ? supplierProducts[0]
            : null;

    const groupedCart = useMemo(() => {
        return purchaseCart.reduce<
            Record<number, PurchaseCartItem[]>
        >((groups, item) => {
            if (!groups[item.supplier.id]) {
                groups[item.supplier.id] = [];
            }

            groups[item.supplier.id].push(item);

            return groups;
        }, {});
    }, [purchaseCart]);


    async function handleConfirmPurchase() {
        if (purchaseCart.length === 0) {
            return;
        }

        try {
            setConfirmingPurchase(true);
            setError("");
            const createdOrders: PurchaseOrder[] = [];

            for (const [supplierId, items] of Object.entries(groupedCart)) {
                const purchaseOrder = await createPurchaseOrder({
                    date: new Date().toISOString(),
                    status: "pending",
                    supplier: Number(supplierId)
                });

                for (const item of items) {
                    await createPurchaseOrderItem({
                        quantity: item.quantity,
                        purchaseOrder: purchaseOrder.id,
                        product: item.product.id
                    });
                }

                const updatedOrder = await getPurchaseOrderById(
                    purchaseOrder.id
                );

                createdOrders.push(updatedOrder);
            }

            setPurchaseOrders((currentOrders) => [
                ...createdOrders,
                ...currentOrders
            ]);

            setPurchaseCart([]);
        } catch (error) {
            console.error(error);

            setError(
                "No se pudieron confirmar los pedidos de compra."
            );
        } finally {
            setConfirmingPurchase(false);
        }
    }

    async function handleUpdatePurchaseOrder(
        orderId: number,
        status: "received" | "cancelled"
    ) {
        try {
            setUpdatingOrderId(orderId);
            setError("");
            const updatedOrder = await updatePurchaseOrder(
                orderId,
                status
            );

            setPurchaseOrders((currentOrders) =>
                currentOrders.map((order) =>
                    order.id === updatedOrder.id
                        ? updatedOrder
                        : order
                )
            );
        } catch (error) {
            console.error(error);
            setError(
                "No se pudo actualizar el pedido de compra."
            );
        } finally {
            setUpdatingOrderId(null);
        }
    }

    const handleViewOrder = async (order: PurchaseOrder) => {
        try {
            setError("");
            setLoadingOrderItems(true);
            setOrderToView(order);

            const items = await getPurchaseOrderItemsByOrder(order.id);
            setOrderItems(items);
        } catch (error: any) {
            console.error(error);
            setError(error.message || "Error al obtener los productos del pedido");
        } finally {
            setLoadingOrderItems(false);
        }
    };
    const filteredOrders = purchaseOrders.filter((order) => {
        const matchesName = !supplierFilter ||
            getSupplierById(order.supplier)?.name.toLowerCase()
                .includes(supplierFilter.toLowerCase());

        return matchesName;
    })

    return (
        <>
            <Header />
            <main className="manager-suppliers-page">
                <section className="manager-suppliers-header">
                    <h1>Proveedores y compras</h1>

                    <p>
                        Compará precios y armá tus pedidos de compra a proveedores.
                    </p>
                </section>

                <section className="supplier-purchase-layout">

                    <section className="supplier-comparison">

                        <div className="supplier-section-header">
                            <h2>Comparar proveedores</h2>

                            <p>
                                Seleccioná un producto para consultar las ofertas
                                disponibles.
                            </p>
                        </div>

                        <div className="product-selector">
                            <label htmlFor="product">
                                Producto
                            </label>

                            <select
                                id="product"
                                value={selectedProduct ?? ""}
                                onChange={(e) =>
                                    handleProductChange(
                                        e.target.value
                                            ? Number(e.target.value)
                                            : null
                                    )
                                }
                                disabled={
                                    loadingProducts ||
                                    loadingSuppliers
                                }
                            >
                                <option value="">
                                    {loadingProducts
                                        ? "Cargando productos..."
                                        : "Seleccioná un producto..."}
                                </option>

                                {products.map((product) => (
                                    <option
                                        key={product.id}
                                        value={product.id}
                                    >
                                        {product.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {error && (
                            <p className="supplier-error">
                                {error}
                            </p>
                        )}

                        <div className="supplier-results">

                            <div className="supplier-results-header">
                                <div>
                                    <h3>
                                        Proveedores disponibles
                                    </h3>

                                    {selectedProductData && (
                                        <p>
                                            {selectedProductData.name}
                                        </p>
                                    )}
                                </div>

                                {supplierProducts.length > 0 && (
                                    <span>
                                        {supplierProducts.length}{" "}
                                        {supplierProducts.length === 1
                                            ? "proveedor"
                                            : "proveedores"}
                                    </span>
                                )}
                            </div>

                            {!selectedProduct && !error && (
                                <div className="supplier-empty">
                                    <span>🔎</span>

                                    <p>
                                        Seleccioná un producto para ver sus
                                        proveedores.
                                    </p>
                                </div>
                            )}

                            {selectedProduct && loadingOffers && (
                                <div className="supplier-empty">
                                    <span>⏳</span>

                                    <p>
                                        Buscando proveedores...
                                    </p>
                                </div>
                            )}

                            {selectedProduct &&
                                !loadingOffers &&
                                supplierProducts.length === 0 &&
                                !error && (
                                    <div className="supplier-empty">
                                        <span>📦</span>

                                        <p>
                                            No hay proveedores disponibles para
                                            este producto.
                                        </p>
                                    </div>
                                )}

                            {!loadingOffers &&
                                supplierProducts.length > 0 && (
                                    <div className="supplier-list">

                                        {supplierProducts.map(
                                            (supplierProduct) => {
                                                const supplier =
                                                    getSupplierById(
                                                        supplierProduct.supplier
                                                    );

                                                const isCheapest =
                                                    cheapestOffer?.id ===
                                                    supplierProduct.id;

                                                return (
                                                    <article
                                                        key={
                                                            supplierProduct.id
                                                        }
                                                        className={`supplier-card ${isCheapest
                                                            ? "supplier-card-best"
                                                            : ""
                                                            }`}
                                                    >
                                                        <div className="supplier-card-info">

                                                            <div className="supplier-card-top">
                                                                {isCheapest && (
                                                                    <span className="supplier-best-badge">
                                                                        🏆 Mejor precio
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <h4>
                                                                {supplier
                                                                    ? supplier.name
                                                                    : `Proveedor #${supplierProduct.supplier}`}
                                                            </h4>

                                                            <span className="supplier-product-price">
                                                                $
                                                                {supplierProduct.price.toLocaleString(
                                                                    "es-AR"
                                                                )}
                                                            </span>

                                                            <span className="supplier-price-label">
                                                                Precio de compra
                                                            </span>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            className="supplier-add-button"
                                                            onClick={() =>
                                                                addToPurchaseCart(
                                                                    supplierProduct
                                                                )
                                                            }
                                                        >
                                                            Agregar
                                                        </button>
                                                    </article>
                                                );
                                            }
                                        )}

                                    </div>
                                )}
                        </div>
                    </section>

                    <aside className="purchase-cart">

                        <div className="purchase-cart-header">
                            <div>
                                <h2>🛒 Pedido</h2>

                                <span>
                                    {totalProducts}{" "}
                                    {totalProducts === 1
                                        ? "producto"
                                        : "productos"}
                                </span>
                            </div>
                        </div>

                        {purchaseCart.length === 0 ? (
                            <div className="purchase-cart-empty">
                                <span>🛒</span>

                                <h3>
                                    Tu pedido está vacío
                                </h3>

                                <p>
                                    Agregá productos desde la lista de proveedores.
                                </p>
                            </div>
                        ) : (
                            <div className="purchase-cart-items">

                                {Object.entries(groupedCart).map(
                                    ([supplierId, items]) => {
                                        const supplier =
                                            items[0].supplier;

                                        const supplierTotal =
                                            items.reduce(
                                                (total, item) =>
                                                    total +
                                                    item.unitPrice *
                                                    item.quantity,
                                                0
                                            );

                                        return (
                                            <div
                                                key={supplierId}
                                                className="purchase-supplier-group"
                                            >
                                                <div className="purchase-supplier-header">
                                                    <div>
                                                        <strong>
                                                            {supplier.name}
                                                        </strong>

                                                        <span>
                                                            {items.length}{" "}
                                                            {items.length === 1
                                                                ? "producto"
                                                                : "productos"}
                                                        </span>
                                                    </div>

                                                    <span>
                                                        $
                                                        {supplierTotal.toLocaleString(
                                                            "es-AR"
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="purchase-supplier-items">

                                                    {items.map((item) => (
                                                        <div
                                                            key={`${item.product.id}-${item.supplier.id}`}
                                                            className="purchase-cart-item"
                                                        >
                                                            <div className="purchase-cart-item-info">
                                                                <strong>
                                                                    {item.product.name}
                                                                </strong>

                                                                <span>
                                                                    $
                                                                    {item.unitPrice.toLocaleString(
                                                                        "es-AR"
                                                                    )}{" "}
                                                                    c/u
                                                                </span>
                                                            </div>

                                                            <div className="purchase-cart-item-actions">

                                                                <div className="quantity-control">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            updateQuantity(
                                                                                item.product.id,
                                                                                item.supplier.id,
                                                                                item.quantity - 1
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            item.quantity ===
                                                                            1
                                                                        }
                                                                    >
                                                                        −
                                                                    </button>

                                                                    <span>
                                                                        {item.quantity}
                                                                    </span>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            updateQuantity(
                                                                                item.product.id,
                                                                                item.supplier.id,
                                                                                item.quantity + 1
                                                                            )
                                                                        }
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>

                                                                <strong className="purchase-item-subtotal">
                                                                    $
                                                                    {(
                                                                        item.unitPrice *
                                                                        item.quantity
                                                                    ).toLocaleString(
                                                                        "es-AR"
                                                                    )}
                                                                </strong>

                                                                <button
                                                                    type="button"
                                                                    className="purchase-remove-button"
                                                                    onClick={() =>
                                                                        removeFromPurchaseCart(
                                                                            item.product.id,
                                                                            item.supplier.id
                                                                        )
                                                                    }
                                                                    title="Eliminar"
                                                                >
                                                                    🗑️
                                                                </button>

                                                            </div>
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                        );
                                    }
                                )}

                            </div>
                        )}



                        <div className="purchase-cart-footer">

                            <div className="purchase-total">
                                <span>Total</span>

                                <strong>
                                    $
                                    {purchaseTotal.toLocaleString(
                                        "es-AR"
                                    )}
                                </strong>
                            </div>

                            <button
                                type="button"
                                disabled={
                                    purchaseCart.length === 0 ||
                                    confirmingPurchase
                                }
                                onClick={() => {
                                    handleConfirmPurchase();
                                    setToastMessage("Pedidos confirmados");
                                }}
                            >
                                {confirmingPurchase
                                    ? "Confirmando..."
                                    : "Confirmar pedidos"}
                            </button>
                        </div>

                        {toastMessage && (
                            <Toast
                                message={toastMessage}
                                onClose={() => setToastMessage(null)}
                            />
                        )}

                    </aside>
                </section>
                <div className="search-supplier">
                    <h1>Buscar pedidos a Proveedores</h1>
                    <input type="text" placeholder="Proveedor" value={supplierFilter} className="supplier-filter-input"
                        onChange={(e) => setSupplierFilter(e.target.value)} />
                </div>
                <section className="purchase-orders-section">

                    <div className="purchase-orders-header">
                        <div>
                            <h2>Pedidos de compra</h2>

                            <p>
                                Consultá y gestioná los pedidos realizados a los proveedores.
                            </p>
                        </div>

                        <span>
                            {filteredOrders.length}{" "}
                            {filteredOrders.length === 1
                                ? "pedido"
                                : "pedidos"}
                        </span>
                    </div>

                    {loadingPurchaseOrders ? (
                        <div className="purchase-orders-empty">
                            <span>⏳</span>
                            <p>Cargando pedidos...</p>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="purchase-orders-empty">
                            <span>📋</span>
                            <p>
                                Todavía no hay pedidos de compra.
                            </p>
                        </div>
                    ) : (
                        <div className="purchase-orders-list">

                            {filteredOrders.map((order) => {
                                console.log("ORDER", order);
                                const supplier = getSupplierById(
                                    order.supplier
                                );
                                return (
                                    <article
                                        key={order.id}
                                        className="purchase-order-card"
                                    >
                                        <div className="purchase-order-info">

                                            <div className="purchase-order-main">
                                                <strong>
                                                    Pedido #{order.id}
                                                </strong>

                                                <span>
                                                    {supplier
                                                        ? supplier.name
                                                        : `Proveedor #${order.supplier}`}
                                                </span>
                                            </div>

                                            <div className="purchase-order-details">
                                                <span>
                                                    {new Date(
                                                        order.date
                                                    ).toLocaleDateString("es-AR")}
                                                </span>

                                                <strong>
                                                    $
                                                    {order.totalAmount.toLocaleString(
                                                        "es-AR"
                                                    )}
                                                </strong>
                                            </div>

                                        </div>

                                        <div className="purchase-order-actions">

                                            <span
                                                className={`purchase-order-status purchase-order-status-${order.status}`}
                                            >
                                                {order.status === "pending" &&
                                                    "Pendiente"}

                                                {order.status === "received" &&
                                                    "Recibido"}

                                                {order.status === "cancelled" &&
                                                    "Cancelado"}
                                            </span>

                                            {order.status === "pending" && (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="purchase-order-receive-button"
                                                        disabled={
                                                            updatingOrderId === order.id
                                                        }
                                                        onClick={() =>
                                                            handleUpdatePurchaseOrder(
                                                                order.id,
                                                                "received"
                                                            )
                                                        }
                                                    >
                                                        {updatingOrderId === order.id
                                                            ? "Actualizando..."
                                                            : "Marcar como Recibido"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="purchase-order-cancel-button"
                                                        disabled={
                                                            updatingOrderId === order.id
                                                        }
                                                        onClick={() =>
                                                            handleUpdatePurchaseOrder(
                                                                order.id,
                                                                "cancelled"
                                                            )
                                                        }
                                                    >
                                                        Cancelar
                                                    </button>
                                                </>
                                            )}

                                            <button
                                                type="button"
                                                className="purchase-order-view-button"
                                                onClick={() =>
                                                    handleViewOrder(order)
                                                }
                                            >
                                                Ver
                                            </button>

                                        </div>
                                    </article>
                                );
                            })}

                        </div>
                    )}

                </section>

                {orderToView && (
                    <div className="purchase-order-detail-overlay">
                        <div className="purchase-order-detail-modal">

                            <div className="purchase-order-detail-header">
                                <h2>Detalle de pedido #{orderToView.id}</h2>

                                <button
                                    type="button"
                                    className="purchase-order-detail-close"
                                    onClick={() => {
                                        setOrderToView(null);
                                        setOrderItems([]);
                                    }}
                                >
                                    ×
                                </button>
                            </div>

                            <div className="purchase-order-detail-content">

                                <div className="purchase-order-detail-row">
                                    <span>Fecha</span>
                                    <strong>
                                        {new Date(
                                            orderToView.date
                                        ).toLocaleDateString("es-AR")}
                                    </strong>
                                </div>

                                <div className="purchase-order-detail-row">
                                    <span>Proveedor</span>
                                    <strong>
                                        {getSupplierById(orderToView.supplier)?.name ||
                                            `Proveedor #${orderToView.supplier}`}
                                    </strong>
                                </div>

                                <div className="purchase-order-detail-row">
                                    <span>Estado</span>
                                    <strong>
                                        {orderToView.status === "pending" &&
                                            "Pendiente"}
                                        {orderToView.status === "received" &&
                                            "Recibido"}
                                        {orderToView.status === "cancelled" &&
                                            "Cancelado"}
                                    </strong>
                                </div>

                                {/* PRODUCTOS DEL PEDIDO */}
                                <div className="purchase-order-detail-products">
                                    <h3>Productos</h3>

                                    {loadingOrderItems ? (
                                        <p>Cargando productos...</p>
                                    ) : orderItems.length === 0 ? (
                                        <p>No hay productos asociados a este pedido.</p>
                                    ) : (
                                        orderItems.map((item) => {
                                            const productObj =
                                                typeof item.product === "object" && item.product !== null
                                                    ? item.product
                                                    : products.find(
                                                        (p) => p.id === item.product.id
                                                    );

                                            const productName =
                                                productObj?.name ||
                                                `Producto #${typeof item.product === "number" ? item.product : item.id}`;

                                            const productBrand =
                                                productObj?.brand || "";

                                            return (
                                                <div
                                                    key={item.id}
                                                    className="purchase-order-detail-product"
                                                >
                                                    <div>
                                                        <strong>
                                                            {productName}
                                                        </strong>

                                                        {productBrand && (
                                                            <span>
                                                                {productBrand}
                                                            </span>
                                                        )}
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
                                            );
                                        })
                                    )}
                                </div>

                                <div className="purchase-order-detail-total">
                                    <span>Total</span>

                                    <strong>
                                        $
                                        {orderToView.totalAmount.toLocaleString(
                                            "es-AR"
                                        )}
                                    </strong>
                                </div>

                            </div>

                            <div className="purchase-order-detail-footer">
                                <button
                                    type="button"
                                    className="purchase-order-detail-close-button"
                                    onClick={() => {
                                        setOrderToView(null);
                                        setOrderItems([]);
                                    }}
                                >
                                    Cerrar
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
}