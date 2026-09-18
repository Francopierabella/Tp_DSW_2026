import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getProductById } from "../../services/product.service";
import { useCart } from "../../context/CartContext";
import type { Product } from "../../types/product";
import "./ProductDetail.css";
import Toast from "../../components/Toast/Toast";

export default function ProductDetail() {

    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {

        if (!id) return;

        getProductById(Number(id))
            .then(data => setProduct(data))
            .catch(error =>
                console.error("Error al obtener el producto:", error)
            );

    }, [id]);

    if (!product) {
        return <p>Cargando producto...</p>;
    }

    return (
        <>
            <Header />

            <main className="product-detail-page">

                <div className="product-detail-container">

                    <div className="product-detail-image">
                        <img
                            src="https://placehold.co/600x500?text=Producto"
                            alt={product.name}
                        />
                    </div>

                    <div className="product-detail-info">

                        <span className="product-detail-category">
                            Producto
                        </span>

                        <h1>{product.name}</h1>

                        <p className="product-detail-description">
                            {product.description}
                        </p>

                        <div className="product-detail-data">
                            <p>
                                <strong>Marca:</strong> {product.brand}
                            </p>

                            <p>
                                <strong>Género:</strong> {product.gender}
                            </p>

                            <p>
                                <strong>Stock disponible:</strong> {product.stock}
                            </p>
                        </div>

                        <span className="product-detail-price">
                            ${product.price.toLocaleString("es-AR")}
                        </span>

                        <button
                            className="product-detail-button"
                            onClick={(e) => {
                                e.preventDefault(); // evita que el enlace se ejecute
                                e.stopPropagation(); // evita que el clic se propague al enlace del card
                                addToCart(product);
                                setToastMessage(`${product.name} agregado al carrito!`);
                            }}
                        >
                            Agregar al carrito
                        </button>

                    </div>

                </div>

                {toastMessage && (
                    <Toast
                        message={toastMessage}
                        onClose={() => setToastMessage(null)}
                    />
                )}

            </main>

            <Footer />
        </>
    );
}