import { useNavigate } from "react-router-dom";
import "./Manager.css"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function Manager() {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <main className="manager-page">
                <section className="manager-header">
                    <h1>Panel de Administración</h1>

                    <p>
                        Gestioná los productos, categorías, ventas y compras
                        de la farmacia.
                    </p>
                </section>

                <section className="manager-options">

                    <article className="manager-card">
                        <div className="manager-card-icon">🛒</div>

                        <h2>Productos</h2>

                        <p>
                            Agregá, modificá o eliminá productos de la farmacia.
                        </p>

                        <button
                            onClick={() => navigate("/manager/products")}
                        >
                            Gestionar productos
                        </button>
                    </article>

                    <article className="manager-card">
                        <div className="manager-card-icon">📂</div>

                        <h2>Categorías</h2>

                        <p>
                            Administrá las categorías disponibles para los
                            productos.
                        </p>

                        <button
                            onClick={() => navigate("/manager/categories")}
                        >
                            Gestionar categorías
                        </button>
                    </article>

                    <article className="manager-card">
                        <div className="manager-card-icon">💰</div>

                        <h2>Ventas</h2>

                        <p>
                            Consultá y gestioná las ventas realizadas en la
                            farmacia.
                        </p>

                        <button
                            onClick={() => navigate("/manager/sales")}
                        >
                            Gestionar ventas
                        </button>
                    </article>

                    <article className="manager-card">
                        <div className="manager-card-icon">🚚</div>

                        <h2>Proveedores y compras</h2>

                        <p>
                            Compará precios y armá pedidos de compra a
                            proveedores.
                        </p>

                        <button
                            onClick={() => navigate("/manager/suppliers")}
                        >
                            Gestionar compras
                        </button>
                    </article>

                </section>
            </main>
            <Footer />
        </>
    );
}