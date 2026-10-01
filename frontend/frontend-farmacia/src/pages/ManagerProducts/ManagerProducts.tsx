import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { Product } from "../../types/product";
import "./ManagerProducts.css";

export default function ManagerProducts() {

    const { user } = useAuth();

    const [showForm, setShowForm] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadProducts() {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/products"
                );

                if (!response.ok) {
                    throw new Error("No se pudieron cargar los productos");
                }

                const data = await response.json();

                setProducts(data);

            } catch (error) {

                console.error(error);

                setError(
                    "No se pudieron cargar los productos"
                );

            } finally {

                setLoading(false);

            }
        }

        loadProducts();

    }, []);

    if (loading) {
        return (
            <div className="manager-products-page">
                <p>Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="manager-products-page">
                <p className="manager-products-error">
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="manager-products-page">

            <div className="manager-products-header">

                <div>
                    <h1>Productos</h1>

                    <p>
                        Gestioná los productos de Farmacia Pierabella.
                    </p>
                </div>

                <button
                    className="manager-primary-button"
                    onClick={() => setShowForm(true)}
                >
                    + Nuevo producto
                </button>

            </div>

            {showForm && (
                <div className="manager-product-form">

                    <h2>Nuevo producto</h2>

                    <div className="manager-form-grid">

                        <div className="manager-form-field">
                            <label>Nombre</label>
                            <input
                                type="text"
                                placeholder="Nombre del producto"
                            />
                        </div>

                        <div className="manager-form-field">
                            <label>Marca</label>
                            <input
                                type="text"
                                placeholder="Marca"
                            />
                        </div>

                        <div className="manager-form-field">
                            <label>Precio</label>
                            <input
                                type="number"
                                placeholder="Precio"
                            />
                        </div>

                        <div className="manager-form-field">
                            <label>Stock</label>
                            <input
                                type="number"
                                placeholder="Stock"
                            />
                        </div>

                        <div className="manager-form-field">
                            <label>Género</label>

                            <select defaultValue="">
                                <option value="" disabled>
                                    Seleccioná un género
                                </option>

                                <option value="Male">
                                    Masculino
                                </option>

                                <option value="Female">
                                    Femenino
                                </option>
                            </select>
                        </div>

                        <div className="manager-form-field">
                            <label>Categoría</label>

                            <select defaultValue="">
                                <option value="" disabled>
                                    Seleccioná una categoría
                                </option>

                                {/* Las categorías las conectamos después */}
                            </select>
                        </div>

                    </div>

                    <div className="manager-form-field">
                        <label>Descripción</label>

                        <textarea
                            placeholder="Descripción del producto"
                            rows={4}
                        />
                    </div>

                    <label className="manager-featured-checkbox">
                        <input
                            type="checkbox"
                        />

                        Producto destacado
                    </label>

                    <div className="manager-form-actions">

                        <button
                            type="button"
                            className="manager-cancel-button"
                            onClick={() => setShowForm(false)}
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            className="manager-primary-button"
                        >
                            Crear producto
                        </button>

                    </div>

                </div>
            )}

            <div className="manager-products-table-container">

                <table className="manager-products-table">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Marca</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Destacado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>

                        {products.map((product) => (

                            <tr key={product.id}>

                                <td>
                                    {product.id}
                                </td>

                                <td>
                                    {product.name}
                                </td>

                                <td>
                                    {product.brand}
                                </td>

                                <td>
                                    ${product.price.toLocaleString("es-AR")}
                                </td>

                                <td>
                                    {product.stock}
                                </td>

                                <td>
                                    {product.isFeatured
                                        ? "Sí"
                                        : "No"}
                                </td>

                                <td>

                                    <div className="manager-product-actions">

                                        <button className="manager-edit-button">
                                            Editar
                                        </button>

                                        <button className="manager-delete-button">
                                            Eliminar
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}