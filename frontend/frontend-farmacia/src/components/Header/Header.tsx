import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import Cart from "../Cart/Cart";
import "./Header.css";

export default function Header() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);

    const { cartItems, clearCart } = useCart();
    const { user, logout } = useAuth();

    const cartItemCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const handleLogout = () => {
        logout();
        clearCart();
    };

    return (
        <header className="header">

            <div className="header-container">

                <a href="/" className="logo">
                    <div className="logo-icon">+</div>

                    <div className="logo-text">
                        <span>Farmacia</span>
                        <strong>Pierabella</strong>
                    </div>
                </a>

                <nav className="nav">

                    <NavLink to="/" className="nav-link">
                        Inicio
                    </NavLink>

                    <NavLink to="/productos" className="nav-link">
                        Productos
                    </NavLink>

                    <NavLink to="/categorias" className="nav-link">
                        Categorías
                    </NavLink>

                </nav>

                <div className="header-actions">

                    {/* Icono de usuario: siempre el mismo SVG.
                        Si está logueado → va a /perfil (ícono en color activo)
                        Si no está logueado → va a /login */}
                    <Link
                        to={user ? "/perfil" : "/login"}
                        className="icon-button"
                        aria-label={user ? "Ver perfil" : "Iniciar sesión"}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="header-icon"
                            fill="none"
                            stroke={user ? "#16aaa5" : "currentColor"}
                            strokeWidth="1.8"
                        >
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                        </svg>
                    </Link>

                    {/* Botón de cerrar sesión: solo aparece si hay usuario logueado */}
                    {user && (
                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Cerrar sesión
                        </button>
                    )}

                    <button
                        className="cart-button"
                        aria-label="Carrito"
                        onClick={() => setCartOpen(true)}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="header-icon"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <circle cx="9" cy="20" r="1" />
                            <circle cx="18" cy="20" r="1" />
                            <path d="M3 4h2l2.5 11h10.8L21 8H6" />
                        </svg>

                        <span className="cart-badge">
                            {cartItemCount}
                        </span>
                    </button>

                    <button
                        className={`menu-button ${menuOpen ? "open" : ""}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Abrir menú"
                        aria-expanded={menuOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                </div>

            </div>

            <nav className={`mobile-nav ${menuOpen ? "show" : ""}`}>

                <NavLink
                    to="/"
                    className="mobile-nav-link"
                    onClick={() => setMenuOpen(false)}
                >
                    Inicio
                </NavLink>

                <NavLink
                    to="/productos"
                    className="mobile-nav-link"
                    onClick={() => setMenuOpen(false)}
                >
                    Productos
                </NavLink>

                <NavLink
                    to="/categorias"
                    className="mobile-nav-link"
                    onClick={() => setMenuOpen(false)}
                >
                    Categorías
                </NavLink>

                {/* En mobile también mostramos el cerrar sesión dentro del menú */}
                {user && (
                    <button
                        className="mobile-nav-link mobile-logout-button"
                        onClick={() => {
                            handleLogout();
                            setMenuOpen(false);
                        }}
                    >
                        Cerrar sesión
                    </button>
                )}

            </nav>

            {cartOpen && (
                <Cart
                    onClose={() => setCartOpen(false)}
                />
            )}

        </header>
    );
}
