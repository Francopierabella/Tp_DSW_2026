import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useCart } from "../../context/CartContext";
import "./Checkout.css";

export default function Checkout() {

    const { cartItems, total } = useCart();
    //exactamente el mismo estado que usa nuestro carrito.
    //Por lo tanto, si actualizamos el carrito desde cualquier lado, este checkout se actualiza automáticamente.

    return (
        <>
            <Header />
            <main className="checkout-page">
                <div className="checkout-container">
                    <div className="checkout-header">
                        <h1>Finalizar compra</h1>
                        <p>Revisá tu pedido antes de confirmar la compra.</p>
                    </div>

                    <div className="checkout-content">
                        <section className="checkout-form">
                            <h2>Datos de la compra</h2>
                            <p className="checkout-placeholder">
                                Próximamente agregaremos los datos del cliente.
                            </p>
                        </section>

                        <section className="checkout-summary">
                            <h2>Resumen del pedido</h2>
                            <div className="checkout-items">
                                {cartItems.map(item => (
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
                                <strong> ${total.toLocaleString("es-AR")}</strong>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}