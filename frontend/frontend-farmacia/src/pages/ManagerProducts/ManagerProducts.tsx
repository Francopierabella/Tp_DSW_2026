import { useEffect, useState } from "react";
import type { Product } from "../../types/product";
import type { ProductCategory } from "../../types/productCategory";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import "./ManagerProducts.css";
import Header from "../../components/Header/Header";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../services/product.service";
import { getProductCategories } from "../../services/productCategory.service";
import Toast from "../../components/Toast/Toast";

export default function ManagerProducts() {
    const LOW_STOCK = 15;

    const [showForm, setShowForm] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
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
    const [hasCoverage, setHasCoverage] = useState(false);
    const [formError, setFormError] = useState("");
    const [productToDelete, setProductToDelete] = useState<Product | null>(null);
    const [nameFilter, setNameFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [stockFilter, setStockFilter] = useState("");

    useEffect(() => {
        async function loadProducts() {
            try {
                const products = await getProducts();
                setProducts(products);
            } catch (error) {
                console.error(error);
                setError("No se pudieron cargar los productos");
            } finally {
                setLoading(false);

            }
        }
        async function loadCategories() {
            try {
                const categories = await getProductCategories();
                setCategories(categories);
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
            isFeatured,
            hasCoverage
        };

        try {
            const newProduct = await createProduct(productData);

            if (!newProduct) {
                setFormError("No se pudo crear el producto");
                return;
            }
            setProducts((currentProducts) => [...currentProducts, newProduct]);
            setToastMessage("Producto creado correctamente");
            setName("");
            setDescription("");
            setBrand("");
            setGender("");
            setPrice("");
            setStock("");
            setCategory("");
            setIsFeatured(false);
            setHasCoverage(false);
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
        // lo que ingreso en el formulario
        const productData = {
            name: name.trim(),
            description: description.trim(),
            brand: brand.trim(),
            gender,
            price: Number(price),
            stock: Number(stock),
            category: Number(category),
            isFeatured,
            hasCoverage
        };

        try {
            const updatedProduct = await updateProduct(id, productData);

            if (!updatedProduct) {
                setFormError("No se pudo actualizar el producto");
                return;
            }

            setProducts((currentProducts) =>
                currentProducts.map((p) => (p.id === id ? updatedProduct : p))
            );

            setName("");
            setToastMessage("Producto actualizado correctamente");
            setDescription("");
            setBrand("");
            setGender("");
            setPrice("");
            setStock("");
            setCategory("");
            setIsFeatured(false);
            setHasCoverage(false);
            setFormError("");
            setShowForm(false);
            setEditingProduct(null);

        } catch (error) {
            console.error(error);
            setFormError("No se pudo conectar con el servidor");
        }
    }

    async function handleDeleteProduct(id: number) {
        try {
            const productDeleted = await deleteProduct(id);

            if (!productDeleted) {
                setFormError("No se pudo eliminar el producto");
                return;
            }
            setProducts((currentProducts) =>
                currentProducts.filter((p) => p.id !== id)
            );
            setProductToDelete(null);
            setFormError("");
        } catch (error) {
            console.error(error);
            setFormError("No se pudo conectar con el servidor");
        }
    }

    const filteredProducts = products.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(nameFilter.toLowerCase());
        const matchesCategory = categoryFilter === "" || p.category === Number(categoryFilter);
        const matchesStock = stockFilter === "" || p.stock === Number(stockFilter) || p.stock <= Number(stockFilter);
        return matchesName && matchesCategory && matchesStock;
    })

    return (
        <>
            <Header />
            <div className="manager-products-page">

                {
                    productToDelete && (
                        <ConfirmModal
                            title="Eliminar producto"
                            message={`¿Estás seguro de que querés eliminar el producto "${productToDelete.name}"?`}
                            onConfirm={() =>
                                handleDeleteProduct(productToDelete.id)
                            }
                            onCancel={() =>
                                setProductToDelete(null)
                            }
                        />
                    )
                }

                {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}

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

                <div className="manager-filters">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                    />

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="">Todas las categorías</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <select
                        value={stockFilter}
                        onChange={(e) => setStockFilter(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="0">Sin stock</option>
                        <option value={String(LOW_STOCK)}>Stock bajo</option>
                    </select>
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
                                    <option value="Unisex">Unisex</option>
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

                        <label className="manager-featured-checkbox">
                            <input
                                type="checkbox"
                                checked={hasCoverage}
                                onChange={(e) => setHasCoverage(e.target.checked)}
                            />

                            Tiene cobertura de obra social
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
                                        setToastMessage("Producto actualizado correctamente");
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
                                <th>Cobertura</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {filteredProducts.map((product) => (

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
                                        {product.hasCoverage
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
                                                onClick={() => setProductToDelete(product)}
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
        </>
    );
}