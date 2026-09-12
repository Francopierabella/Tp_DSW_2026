import { useCart } from "../../context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

interface CartProps {
    onClose: () => void;
}

export default function Cart({ onClose }: CartProps) {

    const navigate = useNavigate();

    const {
        cartItems,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        total
    } = useCart();

    return (
        <div className="cart-overlay" onClick={onClose}>

            <aside
                className="cart-drawer"
                onClick={(event) => event.stopPropagation()}
            >

                <div className="cart-header">
                    <h2>🛒 Mi carrito</h2>

                    <button
                        className="cart-close"
                        onClick={onClose}
                        aria-label="Cerrar carrito"
                    >
                        ✕
                    </button>
                </div>

                {cartItems.length === 0 ? (

                    <div className="cart-empty">
                        <span className="cart-empty-icon">🛒</span>

                        <h3>Tu carrito está vacío</h3>

                        <p>
                            Agregá productos para comenzar tu compra.
                        </p>
                    </div>

                ) : (

                    <>
                        <div className="cart-items">

                            {cartItems.map(item => (

                                <div
                                    className="cart-item"
                                    key={item.product.id}
                                >

                                    <img
                                        src="https://placehold.co/100x100?text=Producto"
                                        alt={item.product.name}
                                        className="cart-item-image"
                                    />

                                    <div className="cart-item-info">

                                        <h3>{item.product.name}</h3>

                                        <span className="cart-item-price">
                                            ${item.product.price.toLocaleString("es-AR")}
                                        </span>

                                        <div className="cart-item-bottom">

                                            <div className="quantity-controls">

                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(item.product.id)
                                                    }
                                                >
                                                    −
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(item.product.id)
                                                    }
                                                    disabled={
                                                        item.quantity >= item.product.stock
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <button
                                                className="cart-item-delete"
                                                onClick={() =>
                                                    removeFromCart(item.product.id)
                                                }
                                                aria-label="Eliminar producto"
                                            >
                                                Eliminar
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                        <div className="cart-footer">

                            <div className="cart-total">
                                <span>Total:</span>

                                <strong>
                                    ${total.toLocaleString("es-AR")}
                                </strong>
                            </div>

                            <button
                                className="checkout-button"
                                onClick={() => navigate("/productos")}
                            >
                                Continuar con la compra
                            </button>

                        </div>
                    </>

                )}

            </aside>

        </div>
    );
}
