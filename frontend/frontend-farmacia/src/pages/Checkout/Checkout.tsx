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
import { productHealthInsuranceService } from "../../services/productHealthInsurance.service";
import type { ProductHealthInsurance } from "../../types/productHealthInsurance";

export default function Checkout() {
    const { cartItems, total, clearCart } = useCart();
    const { user, role, token } = useAuth();

    const [healthInsuranceName, setHealthInsuranceName] = useState<string | null>(null);
    const [customerCoverages, setCustomerCoverages] = useState<ProductHealthInsurance[]>([]);

    const [paymentMethod, setPaymentMethod] =
        useState<'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER'>('CASH');

    const [deliveryMethod, setDeliveryMethod] =
        useState<'PICKUP' | 'DELIVERY'>('PICKUP');

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [createdSaleId, setCreatedSaleId] = useState<number | null>(null);
    const [showToast, setShowToast] = useState(false);

    // Obtener la obra social del cliente y sus coberturas específicas
    useEffect(() => {
        const loadHealthInsurance = async () => {
            if (!user || role !== "CUSTOMER" || !token) {
                return;
            }

            try {
                // 1. Obtener perfil del cliente logueado
                const customer = await getCustomerProfile(user.id, token);

                if (!customer.healthInsurance) {
                    setHealthInsuranceName(null);
                    setCustomerCoverages([]);
                    return;
                }

                // 2. Obtener el nombre de su obra social
                const healthInsurances = await getHealthInsurances();
                const healthInsurance = healthInsurances.find(
                    (insurance) => insurance.id === customer.healthInsurance
                );
                setHealthInsuranceName(healthInsurance ? healthInsurance.name : null);

                // 3. Obtener las coberturas de esta obra social para los productos
                const coverages = await productHealthInsuranceService.getByHealthInsurance(customer.healthInsurance);
                setCustomerCoverages(Array.isArray(coverages) ? coverages : []);

            } catch (error) {
                console.error("Error al obtener datos de cobertura:", error);
                setHealthInsuranceName(null);
                setCustomerCoverages([]);
            }
        };

        loadHealthInsurance();
    }, [user, role, token]);

    // Helper: calcula el descuento de un producto específico
    const getItemDiscount = (productId: number, unitPrice: number, quantity: number) => {
        const rule = customerCoverages.find(c => c.product === productId);
        if (!rule || rule.coveragePercentage <= 0) {
            return { percentage: 0, discountAmount: 0 };
        }
        const totalItemPrice = unitPrice * quantity;
        const discountAmount = totalItemPrice * (rule.coveragePercentage / 100);
        return {
            percentage: rule.coveragePercentage,
            discountAmount
        };
    };

    // Calcula el monto total que cubre la obra social
    const calculateTotalCoverage = () => {
        return cartItems.reduce((acc, item) => {
            const { discountAmount } = getItemDiscount(item.product.id, item.product.price, item.quantity);
            return acc + discountAmount;
        }, 0);
    };

    const totalDiscountAmount = calculateTotalCoverage();
    const finalTotal = total - totalDiscountAmount;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            setErrorMessage("El carrito está vacío. Agregá productos antes de comprar.");
            return;
        }

        if (!user || role !== "CUSTOMER" || !token) {
            setErrorMessage("Debes iniciar sesión como cliente para realizar la compra.");
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
                                        <strong>Comprando como:</strong>
                                        <span>{user?.firstName} {user?.lastName}</span>

                                        <div className="checkout-coverage-info">
                                            <div>
                                                <span>Obra Social asignada:</span>
                                                <strong>{healthInsuranceName ?? "Particular (Sin Obra Social)"}</strong>
                                            </div>

                                            {totalDiscountAmount > 0 && (
                                                <div>
                                                    <span>Ahorro por Cobertura:</span>
                                                    <strong className="checkout-saved-amount">
                                                        -${Math.round(totalDiscountAmount).toLocaleString("es-AR")}
                                                    </strong>
                                                </div>
                                            )}

                                            <div className="checkout-final-total">
                                                <span>Total a pagar:</span>
                                                <strong>
                                                    ${Math.round(finalTotal).toLocaleString("es-AR")}
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
                                            required
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
                                    {cartItems.map((item) => {
                                        const { percentage, discountAmount } = getItemDiscount(
                                            item.product.id,
                                            item.product.price,
                                            item.quantity
                                        );
                                        const subtotal = item.product.price * item.quantity;
                                        const itemFinal = subtotal - discountAmount;

                                        return (
                                            <div className="checkout-item" key={item.product.id}>
                                                <div className="checkout-item-info">
                                                    <h3>{item.product.name}</h3>
                                                    <span>Cantidad: {item.quantity} </span>

                                                    {/* Badge de cobertura por ítem */}
                                                    {percentage > 0 ? (
                                                        <span className="checkout-item-badge-discount">
                                                            ✓ {healthInsuranceName}: {percentage}% OFF (-${Math.round(discountAmount).toLocaleString("es-AR")})
                                                        </span>
                                                    ) : healthInsuranceName ? (
                                                        <span className="checkout-item-badge-neutral">
                                                            Sin cobertura con {healthInsuranceName}
                                                        </span>
                                                    ) : null}
                                                </div>

                                                <div className="checkout-item-pricing">
                                                    {percentage > 0 ? (
                                                        <>
                                                            <span className="checkout-item-original-price">
                                                                ${subtotal.toLocaleString("es-AR")}
                                                            </span>
                                                            <strong className="checkout-item-final-price">
                                                                ${Math.round(itemFinal).toLocaleString("es-AR")}
                                                            </strong>
                                                        </>
                                                    ) : (
                                                        <strong>${subtotal.toLocaleString("es-AR")}</strong>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="checkout-totals-breakdown">
                                    <div className="checkout-total-row">
                                        <span>Subtotal:</span>
                                        <span>${total.toLocaleString("es-AR")}</span>
                                    </div>
                                    {totalDiscountAmount > 0 && (
                                        <div className="checkout-total-row discount-row">
                                            <span>Descuento Obra Social:</span>
                                            <span>-${Math.round(totalDiscountAmount).toLocaleString("es-AR")}</span>
                                        </div>
                                    )}
                                    <div className="checkout-total-row final-row">
                                        <strong>Total final:</strong>
                                        <strong>${Math.round(finalTotal).toLocaleString("es-AR")}</strong>
                                    </div>
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