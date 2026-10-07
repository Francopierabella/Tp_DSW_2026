import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Toast from "../../components/Toast/Toast";
import { useCart } from "../../context/CartContext";
import { createSale, createSaleItem } from "../../services/sale.service";
import "./Checkout.css";
import { useAuth } from "../../context/AuthContext";
import { getCustomerProfile } from "../../services/customer.service";
import { getHealthInsurances } from "../../services/healthInsurance.service";

export default function Checkout() {
    const { cartItems, total, clearCart } = useCart();
    const { user, role, token } = useAuth();

    const [coveragePercentage, setCoveragePercentage] = useState(0);
    const [healthInsuranceName, setHealthInsuranceName] = useState<string | null>(null);

    const [paymentMethod, setPaymentMethod] =
        useState<'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER'>('CASH');

    const [deliveryMethod, setDeliveryMethod] =
        useState<'PICKUP' | 'DELIVERY'>('PICKUP');

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [createdSaleId, setCreatedSaleId] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);

    // Calcula cuánto cubre la obra social
    const calculateCoverage = () => {
        if (coveragePercentage === 0) {
            return 0;
        }

        return cartItems.reduce((totalCoverage, item) => {
            // Si el producto no tiene cobertura, no se aplica descuento
            if (!item.product.hasCoverage) {
                return totalCoverage;
            }

            const itemTotal = item.product.price * item.quantity;

            const itemCoverage =
                itemTotal * (coveragePercentage / 100);

            return totalCoverage + itemCoverage;
        }, 0);
    };

    // Calculamos estos valores directamente, sin guardarlos en estados
    const coverageAmount = calculateCoverage();
    const finalTotal = total - coverageAmount;

    // Obtener la obra social del cliente logueado
    useEffect(() => {
        const loadHealthInsurance = async () => {
            if (!user || role !== "CUSTOMER" || !token) {
                return;
            }

            try {
                // Obtener los datos del cliente logueado
                const customer = await getCustomerProfile(user.id, token);

                // Si el cliente no tiene obra social
                if (!customer.healthInsurance) {
                    setCoveragePercentage(0);
                    setHealthInsuranceName(null);
                    return;
                }

                // Obtener todas las obras sociales
                const healthInsurances = await getHealthInsurances();

                // Buscar la obra social del cliente
                const healthInsurance = healthInsurances.find(
                    (insurance) => insurance.id === customer.healthInsurance
                );

                if (!healthInsurance) {
                    setCoveragePercentage(0);
                    setHealthInsuranceName(null);
                    return;
                }

                // Guardar los datos de la obra social
                setCoveragePercentage(healthInsurance.coveragePercentage);
                setHealthInsuranceName(healthInsurance.name);

            } catch (error) {
                console.error(
                    "Error al obtener la obra social:",
                    error
                );

                setCoveragePercentage(0);
                setHealthInsuranceName(null);
            }
        };

        loadHealthInsurance();
    }, [user, role, token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            setErrorMessage(
                "El carrito está vacío. Agregá productos antes de comprar."
            );
            return;
        }

        if (!user || role !== "CUSTOMER" || !token) {
            setErrorMessage(
                "Debes iniciar sesión como cliente para realizar la compra."
            );
            return;
        }

        setLoading(true);
        setErrorMessage(null);

        try {
            // 1. Crear la venta usando el cliente logueado
            const newSale = await createSale({
                paymentMethod,
                deliveryMethod,
                customer: user.id,
                manager: 1 // Temporal hasta resolver el manager autenticado
            });

            // 2. Crear los ítems de la venta
            for (const item of cartItems) {
                await createSaleItem({
                    sale: newSale.id,
                    product: item.product.id,
                    quantity: item.quantity
                });
            }

            // 3. Limpiar carrito y mostrar éxito
            clearCart();
            setCreatedSaleId(newSale.id);
            setShowToast(true);

        } catch (error: any) {
            setErrorMessage(
                error.message ||
                "Ocurrió un error al procesar la compra."
            );
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
                                Tu pedido <strong>#{createdSaleId}</strong> fue registrado correctamente.
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

                                    <div className="checkout-customer-info">
                                        <strong>Compra como</strong>
                                        <span>
                                            {user?.firstName} {user?.lastName}
                                        </span>
                                        <div className="checkout-coverage-info">
                                            <div>
                                                <span>Obra social</span>
                                                <strong>{healthInsuranceName ?? "Sin obra social"}</strong>
                                            </div>

                                            <div>
                                                <span>Cobertura</span>
                                                <strong>{coveragePercentage}%</strong>
                                            </div>

                                            <div>
                                                <span>Monto cubierto</span>
                                                <strong>
                                                    ${coverageAmount.toLocaleString("es-AR")}
                                                </strong>
                                            </div>

                                            <div className="checkout-final-total">
                                                <span>Total final</span>
                                                <strong>
                                                    ${finalTotal.toLocaleString("es-AR")}
                                                </strong>
                                            </div>
                                        </div>
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
                                            required
                                            onInvalid={(e) => e.currentTarget.setCustomValidity("Debes seleccionar un método de pago.")}
                                            onInput={(e) => e.currentTarget.setCustomValidity("")}
                                        >
                                            <option value="" disabled selected>Seleccionar</option>
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
                                            required
                                            onInvalid={(e) => e.currentTarget.setCustomValidity("Debes seleccionar un método de entrega.")}
                                            onInput={(e) => e.currentTarget.setCustomValidity("")}
                                        >
                                            <option value="" disabled selected>Seleccionar</option>
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