import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { getProductById } from "../../services/product.service";
import { productHealthInsuranceService } from "../../services/productHealthInsurance.service";
import { getHealthInsurances } from "../../services/healthInsurance.service";
import { useCart } from "../../context/CartContext";
import type { Product } from "../../types/product";
import type { ProductHealthInsurance } from "../../types/productHealthInsurance";
import type { HealthInsurance } from "../../types/healthInsurances";
import "./ProductDetail.css";
import Toast from "../../components/Toast/Toast";
import { useAuth } from "../../context/AuthContext";

export default function ProductDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [coverages, setCoverages] = useState<ProductHealthInsurance[]>([]);
    const [healthInsurances, setHealthInsurances] = useState<HealthInsurance[]>([]);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        if (!id) return;
        const productId = Number(id);

        // 1. Cargar el producto
        getProductById(productId)
            .then(data => setProduct(data))
            .catch(error => console.error("Error al obtener el producto:", error));

        // 2. Cargar las coberturas de este producto
        productHealthInsuranceService.getByProduct(productId)
            .then(data => setCoverages(Array.isArray(data) ? data : []))
            .catch(error => console.error("Error al obtener coberturas:", error));

        // 3. Cargar las obras sociales para conocer sus nombres
        getHealthInsurances()
            .then(data => setHealthInsurances(data))
            .catch(error => console.error("Error al obtener obras sociales:", error));
    }, [id]);

    if (!product) {
        return <p>Cargando producto...</p>;
    }

    // Helper para obtener el nombre de la obra social por su ID
    const getHealthInsuranceName = (insuranceId: number) => {
        const found = healthInsurances.find(hi => hi.id === insuranceId);
        return found ? found.name : `Obra Social #${insuranceId}`;
    };

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

                        <div className="product-detail-coverages">
                            <h3>Coberturas con Obra Social</h3>
                            {coverages.length === 0 ? (
                                <p className="no-coverage-text">
                                    Este producto no cuenta con descuento por obra social.
                                </p>
                            ) : (
                                <div className="coverage-badges-list">
                                    {coverages.map((cov) => {
                                        const discountPrice = product.price * (1 - cov.coveragePercentage / 100);
                                        return (
                                            <div key={cov.id} className="coverage-badge-item">
                                                <span className="coverage-hi-name">
                                                    {getHealthInsuranceName(cov.healthInsurance)}
                                                </span>
                                                <span className="coverage-percentage">
                                                    {cov.coveragePercentage}% OFF
                                                </span>
                                                <span className="coverage-final-price">
                                                    Final: ${Math.round(discountPrice).toLocaleString("es-AR")}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <span className="product-detail-price">
                            ${product.price.toLocaleString("es-AR")}
                        </span>

                        <button
                            className="product-detail-button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (!user) {
                                    navigate("/login");
                                } else {
                                    addToCart(product);
                                    setToastMessage(`${product.name} agregado al carrito!`);
                                }
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