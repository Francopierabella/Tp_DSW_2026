import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Toast from "../../components/Toast/Toast";
import { useCart } from "../../context/CartContext";
import { createSale, createSaleItem } from "../../services/sale.service";
import "./Checkout.css";

export default function Checkout() {
    const { cartItems, total, clearCart } = useCart();

    const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER'>('CASH');
    const [deliveryMethod, setDeliveryMethod] = useState<'PICKUP' | 'DELIVERY'>('PICKUP');
    const [customerName, setCustomerName] = useState("");
    const [customerDni, setCustomerDni] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [createdSaleId, setCreatedSaleId] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            setErrorMessage("El carrito está vacío. Agregá productos antes de comprar.");
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        try {
            // 1. Buscar al cliente por DNI en el backend
            const customerResponse = await fetch(`http://localhost:3000/api/customers/dni/${customerDni}`);

            if (!customerResponse.ok) {
                if (customerResponse.status === 404) {
                    throw new Error("No se encontró ningún cliente con ese DNI. Por favor, registrate primero.");
                }
                throw new Error("Error al verificar el cliente.");
            }

            // Extraer el ID del cliente que nos devolvió el backend
            const customer = await customerResponse.json();
            const realCustomerId = customer.id;

            // 2. Crear la venta usando el ID real del cliente
            const newSale = await createSale({
                paymentMethod,
                deliveryMethod,
                customer: realCustomerId, // 👈 ¡Ahora usamos el ID real!
                manager: 1 // Manager temporal hasta tener autenticación
            });

            // 3. Crear los ítems de la venta
            for (const item of cartItems) {
                await createSaleItem({
                    sale: newSale.id,
                    product: item.product.id,
                    quantity: item.quantity
                });
            }

            // 4. Limpiar carrito y mostrar éxito
            clearCart();
            setCreatedSaleId(newSale.id);
            setShowToast(true);
        } catch (error: any) {
            setErrorMessage(error.message || "Ocurrió un error al procesar la compra.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            {showToast && (
                <Toast
                    message="¡Compra confirmada con éxito!"
                    onClose={() => setShowToast(false)}
                />
            )}
            <main className="checkout-page">
                <div className="checkout-container">
                    <div className="checkout-header">
                        <h1>Finalizar compra</h1>
                        <p>Revisá tu pedido antes de confirmar la compra.</p>
                    </div>

                    {createdSaleId ? (
                        <div className="checkout-success-card">
                            <h2>¡Gracias por tu compra! 🎉</h2>
                            <p>
                                Tu pedido <strong>#{createdSaleId}</strong> fue registrado con estado <strong>PENDIENTE</strong>.
                            </p>
                            <Link to="/productos" className="checkout-btn-secondary">
                                Seguir comprando
                            </Link>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className="checkout-empty">
                            <h2>Tu carrito está vacío</h2>
                            <p>Agregá productos al carrito antes de proceder al pago.</p>
                            <Link to="/productos" className="checkout-btn-secondary">
                                Explorar productos
                            </Link>
                        </div>
                    ) : (
                        <div className="checkout-content">
                            <section className="checkout-form">
                                <h2>Datos de la compra</h2>

                                {errorMessage && (
                                    <div className="checkout-error-msg">
                                        {errorMessage}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="checkout-form-group">
                                        <label className="checkout-label" htmlFor="customerName">
                                            Tu nombre y apellido
                                        </label>
                                        <input
                                            id="customerName"
                                            type="text"
                                            className="checkout-input"
                                            placeholder="Ingresá tu nombre y apellido"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="checkout-form-group">
                                        <label className="checkout-label" htmlFor="customerDni">
                                            Tu dni
                                        </label>
                                        <input
                                            id="customerDni"
                                            type="text"
                                            className="checkout-input"
                                            value={customerDni}
                                            onChange={(e) => setCustomerDni(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="checkout-form-group">
                                        <label className="checkout-label" htmlFor="paymentMethod">
                                            Método de pago
                                        </label>
                                        <select
                                            id="paymentMethod"
                                            className="checkout-select"
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value as any)}
                                        >
                                            <option value="CASH">Efectivo</option>
                                            <option value="CREDIT_CARD">Tarjeta de Crédito</option>
                                            <option value="DEBIT_CARD">Tarjeta de Débito</option>
                                            <option value="TRANSFER">Transferencia bancaria</option>
                                        </select>
                                    </div>

                                    <div className="checkout-form-group">
                                        <label className="checkout-label" htmlFor="deliveryMethod">
                                            Método de entrega
                                        </label>
                                        <select
                                            id="deliveryMethod"
                                            className="checkout-select"
                                            value={deliveryMethod}
                                            onChange={(e) => setDeliveryMethod(e.target.value as any)}
                                        >
                                            <option value="PICKUP">Retiro en sucursal</option>
                                            <option value="DELIVERY">Envío a domicilio</option>
                                        </select>
                                    </div>

                                    <button
                                        type="submit"
                                        className="checkout-btn-submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Procesando compra..." : "Confirmar compra"}
                                    </button>
                                </form>
                            </section>

                            <section className="checkout-summary">
                                <h2>Resumen del pedido</h2>
                                <div className="checkout-items">
                                    {cartItems.map((item) => (
                                        <div className="checkout-item" key={item.product.id}>
                                            <div className="checkout-item-info">
                                                <h3>{item.product.name}</h3>
                                                <span>Cantidad: {item.quantity}</span>
                                            </div>
                                            <strong>
                                                ${(item.product.price * item.quantity).toLocaleString("es-AR")}
                                            </strong>
                                        </div>
                                    ))}
                                </div>
                                <div className="checkout-total">
                                    <span>Total</span>
                                    <strong>${total.toLocaleString("es-AR")}</strong>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}