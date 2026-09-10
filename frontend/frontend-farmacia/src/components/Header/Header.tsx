import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">

            <div className="header-container">

                {/* Logo */}
                <a href="/" className="logo">
                    <div className="logo-icon">+</div>

                    <div className="logo-text">
                        <span>Farmacia</span>
                        <strong>Pierabella</strong>
                    </div>
                </a>
                {/* Navegación desktop */}
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
                {/* Acciones */}
                <div className="header-actions">

                    {/* Usuario */}
                    <button
                        className="icon-button"
                        aria-label="Mi cuenta"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="header-icon"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" />
                        </svg>
                    </button>


                    {/* Carrito */}
                    <button
                        className="cart-button"
                        aria-label="Carrito"
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
                            0
                        </span>
                    </button>


                    {/* Botón hamburguesa */}
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


            {/* Menú mobile */}
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

            </nav>
        </header>
    );
}