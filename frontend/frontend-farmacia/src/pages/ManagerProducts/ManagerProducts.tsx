import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { Product } from "../../types/product";
import type { ProductCategory } from "../../types/productCategory";
import "./ManagerProducts.css";


export default function ManagerProducts() {

    const { user } = useAuth();
    const { token } = useAuth();

    const [showForm, setShowForm] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [gender, setGender] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [isFeatured, setIsFeatured] = useState(false);
    const [formError, setFormError] = useState("");

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
        async function loadCategories() {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/productCategories"
                );

                if (!response.ok) {
                    throw new Error("No se pudieron cargar las categorías");
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        }

        loadProducts();
        loadCategories();

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

    function validateProductForm() {
        if (!name.trim()) {
            return "El nombre es obligatorio";
        }

        if (!description.trim()) {
            return "La descripción es obligatoria";
        }

        if (!brand.trim()) {
            return "La marca es obligatoria";
        }

        if (!gender) {
            return "Seleccioná un género";
        }

        if (!price || Number(price) <= 0) {
            return "El precio debe ser mayor que 0";
        }

        if (stock === "" || Number(stock) < 0) {
            return "El stock no puede ser negativo";
        }

        if (!category) {
            return "Seleccioná una categoría";
        }

        return null;
    }

    async function handleCreateProduct() {
        const validationError = validateProductForm();

        if (validationError) {
            setFormError(validationError);
            return;
        }

        const productData = {
            name: name.trim(),
            description: description.trim(),
            brand: brand.trim(),
            gender,
            price: Number(price),
            stock: Number(stock),
            category: Number(category),
            isFeatured
        };

        try {
            const response = await fetch(
                "http://localhost:3000/api/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(productData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setFormError(data.message || "No se pudo crear el producto");
                return;
            }

            const newProduct = data.data;

            setProducts((currentProducts) => [
                ...currentProducts,
                newProduct
            ]);

            setName("");
            setDescription("");
            setBrand("");
            setGender("");
            setPrice("");
            setStock("");
            setCategory("");
            setIsFeatured(false);
            setFormError("");
            setShowForm(false);

        } catch (error) {
            console.error(error);
            setFormError("No se pudo conectar con el servidor");
        }
    }

    async function handleUpdateProduct(id: number) {
        const validationError = validateProductForm();

        if (validationError) {
            setFormError(validationError);
            return;
        }

        const productData = {
            name: name.trim(),
            description: description.trim(),
            brand: brand.trim(),
            gender,
            price: Number(price),
            stock: Number(stock),
            category: Number(category),
            isFeatured
        };

        try {
            const response = await fetch(
                `http://localhost:3000/api/products/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(productData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setFormError(data.message || "No se pudo actualizar el producto");
                return;
            }

            const updatedProduct = data;

            setProducts((currentProducts) =>
                currentProducts.map((p) => (p.id === id ? updatedProduct : p))
            );

            setName("");
            setDescription("");
            setBrand("");
            setGender("");
            setPrice("");
            setStock("");
            setCategory("");
            setIsFeatured(false);
            setFormError("");
            setShowForm(false);
            setEditingProduct(null);

        } catch (error) {
            console.error(error);
            setFormError("No se pudo conectar con el servidor");
        }
    }

    async function handleDeleteProduct(id: number) {
        const confirmed = window.confirm(
            "¿Estás seguro de que querés eliminar este producto?"
        );

        if (!confirmed) {
            return;
        }


        try {
            const response = await fetch(
                `http://localhost:3000/api/products/${id}`,
                {
                    method: "DELETE",
                    headers: {

                        "Authorization": `Bearer ${token}`
                    },
                }
            );
            const data = await response.json();
            if (!response.ok) {
                setFormError(data.message || "No se pudo eliminar el producto");
                return;
            }
            setProducts((currentProducts) =>
                currentProducts.filter((p) => p.id !== id)
            );
            setFormError("");
        } catch (error) {
            console.error(error);
            setFormError("No se pudo conectar con el servidor");
        }
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

                    <h2>
                        {editingProduct ? "Editar producto" : "Nuevo producto"}
                    </h2>

                    <div className="manager-form-grid">

                        <div className="manager-form-field">
                            <label>Nombre</label>
                            <input
                                type="text"
                                placeholder="Nombre del producto"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="manager-form-field">
                            <label>Marca</label>
                            <input
                                type="text"
                                placeholder="Marca"
                                value={brand}
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </div>

                        <div className="manager-form-field">
                            <label>Precio</label>
                            <input
                                type="number"
                                placeholder="Precio"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="manager-form-field">
                            <label>Stock</label>
                            <input
                                type="number"
                                placeholder="Stock"
                                value={stock}
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>

                        <div className="manager-form-field">
                            <label>Género</label>

                            <select
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option value="" disabled>
                                    Seleccioná un género
                                </option>
                                <option value="Male">Masculino</option>
                                <option value="Female">Femenino</option>
                            </select>
                        </div>

                        <div className="manager-form-field">
                            <label>Categoría</label>

                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="" disabled>
                                    Seleccioná una categoría
                                </option>

                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >{category.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div className="manager-form-field">
                        <label>Descripción</label>

                        <textarea
                            placeholder="Descripción del producto"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <label className="manager-featured-checkbox">
                        <input
                            type="checkbox"
                            checked={isFeatured}
                            onChange={(e) => setIsFeatured(e.target.checked)}
                        />

                        Producto destacado
                    </label>

                    {formError && (
                        <p className="manager-form-error">
                            {formError}
                        </p>
                    )}

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
                            onClick={() => {
                                if (editingProduct) {
                                    handleUpdateProduct(editingProduct.id);
                                } else {
                                    handleCreateProduct();
                                }
                            }}
                        >
                            {editingProduct ? "Guardar cambios" : "Crear producto"}
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

                                        <button
                                            className="manager-edit-button"
                                            onClick={() => {
                                                setEditingProduct(product);

                                                setName(product.name);
                                                setDescription(product.description);
                                                setBrand(product.brand);
                                                setGender(product.gender);
                                                setPrice(String(product.price));
                                                setStock(String(product.stock));
                                                setCategory(String(product.category));
                                                setIsFeatured(product.isFeatured);

                                                setShowForm(true);
                                            }}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            className="manager-delete-button"
                                            onClick={() => handleDeleteProduct(product.id)}
                                        >
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