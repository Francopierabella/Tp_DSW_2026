import { useEffect, useState } from "react";
import type { ProductCategory } from "../../types/productCategory";
import "./ManagerCategories.css";
import { useAuth } from "../../context/AuthContext";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import Header from "../../components/Header/Header";

export default function ManagerCategories() {
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [categoryToDelete, setCategoryToDelete] = useState<ProductCategory | null>(null);

    const { token } = useAuth();

    useEffect(() => {
        async function loadCategories() {
            try {
                const response = await fetch(
                    "http://localhost:3000/api/productCategories"
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "No se pudieron cargar las categorías"
                    );
                }

                setCategories(data);
            } catch (error) {
                console.error(error);
                setError("No se pudieron cargar las categorías");
            } finally {
                setLoading(false);
            }
        }

        loadCategories();
    }, []);

    if (loading) {
        return (
            <div className="manager-categories-page">
                <p>Cargando categorías...</p>
            </div>
        );
    }

    if (error && categories.length === 0) {
        return (
            <div className="manager-categories-page">
                <p className="manager-categories-error">
                    {error}
                </p>
            </div>
        );
    }

    async function handleCreateCategory() {
        if (!name.trim()) {
            setError("El nombre es obligatorio");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:3000/api/productCategories",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: name.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "No se pudo crear la categoría"
                );
            }

            setCategories((currentCategories) => [
                ...currentCategories,
                data.data
            ]);

            setName("");
            setError("");
            setShowForm(false);

        } catch (error) {
            console.error(error);
            setError("No se pudo crear la categoría");
        }
    }

    function handleUpdateCategory(id: number) {
        const category = categories.find((cat) => cat.id === id);

        if (!category) {
            return;
        }

        setEditingCategoryId(id);
        setName(category.name);
        setShowForm(true);
        setError("");
    }

    async function handleSaveCategory() {
        if (!name.trim()) {
            setError("El nombre es obligatorio");
            return;
        }

        if (editingCategoryId === null) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/api/productCategories/${editingCategoryId}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        name: name.trim()
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "No se pudo actualizar la categoría"
                );
            }

            setCategories((currentCategories) =>
                currentCategories.map((category) =>
                    category.id === editingCategoryId
                        ? data.data
                        : category
                )
            );

            setName("");
            setError("");
            setShowForm(false);
            setEditingCategoryId(null);

        } catch (error) {
            console.error(error);
            setError("No se pudo actualizar la categoría");
        }
    }

    async function handleDeleteCategory(id: number) {
        try {
            const response = await fetch(
                `http://localhost:3000/api/productCategories/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "No se pudo eliminar la categoría"
                );
            }

            setCategories((currentCategories) =>
                currentCategories.filter(
                    (category) => category.id !== id
                )
            );

            setCategoryToDelete(null);
            setError("");

        } catch (error) {
            console.error(error);
            setError("No se pudo eliminar la categoría");
            setCategoryToDelete(null);
        }
    }

    return (
        <>
            <Header />
            <div className="manager-categories-page">
                {
                    categoryToDelete && (
                        <ConfirmModal
                            title="Eliminar categoría"
                            message={`¿Estás seguro de que querés eliminar la categoría "${categoryToDelete.name}"?`}
                            onConfirm={() =>
                                handleDeleteCategory(categoryToDelete.id)
                            }
                            onCancel={() =>
                                setCategoryToDelete(null)
                            }
                        />
                    )
                }

                <div className="manager-categories-header">
                    <div>
                        <h1>Categorías</h1>
                        <p>
                            Gestioná las categorías de Farmacia Pierabella.
                        </p>
                    </div>

                    <button
                        className="manager-primary-button"
                        onClick={() => {
                            setEditingCategoryId(null);
                            setName("");
                            setError("");
                            setShowForm(true);
                        }}
                    >
                        + Nueva categoría
                    </button>
                </div>

                {showForm && (
                    <div className="manager-category-form">

                        <h2>
                            {editingCategoryId !== null
                                ? "Editar categoría"
                                : "Nueva categoría"}
                        </h2>

                        <div className="manager-form-field">
                            <label htmlFor="category-name">
                                Nombre
                            </label>

                            <input
                                id="category-name"
                                type="text"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                placeholder="Ingresá el nombre de la categoría"
                            />
                        </div>

                        {error && (
                            <p className="manager-categories-error">
                                {error}
                            </p>
                        )}

                        <div className="manager-form-actions">

                            <button
                                type="button"
                                className="manager-primary-button"
                                onClick={
                                    editingCategoryId !== null
                                        ? handleSaveCategory
                                        : handleCreateCategory
                                }
                            >
                                {editingCategoryId !== null
                                    ? "Guardar cambios"
                                    : "Crear categoría"}
                            </button>

                            <button
                                type="button"
                                className="manager-secondary-button"
                                onClick={() => {
                                    setShowForm(false);
                                    setName("");
                                    setError("");
                                    setEditingCategoryId(null);
                                }}
                            >
                                Cancelar
                            </button>

                        </div>

                    </div>
                )}

                <div className="manager-categories-table-container">
                    <table className="manager-categories-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>{category.name}</td>

                                    <td>
                                        <div className="manager-category-actions">
                                            <button
                                                className="manager-edit-button"
                                                onClick={() => handleUpdateCategory(category.id)}
                                            >
                                                Editar
                                            </button>

                                            <button
                                                className="manager-delete-button"
                                                onClick={() => setCategoryToDelete(category)}
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