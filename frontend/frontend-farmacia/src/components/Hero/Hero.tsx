import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Hero.css";
import { getProductCategories } from "../../services/productCategory.service.ts";
import type { ProductCategory } from "../../types/productCategory.ts";

export default function Hero() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useState<ProductCategory[]>([])

    useEffect(() => {
        getProductCategories()
            .then(data => setCategories(data))
            .catch(error => console.error("Error fetching categories:", error))
    }, [])
    return (
        <section className="hero">

            <div className="hero-overlay"></div>

            <div className="hero-container">

                <div className="hero-content">

                    <h1>Farmacia Pierabella</h1>

                    <h2>Tu salud, nuestra prioridad</h2>

                    <p>Encontrá todo lo que necesitás para tu bienestar y el de tu familia, en un solo lugar.</p>

                    <div className="search-container">

                        <div className="search-input-wrapper">

                            <svg
                                className="search-icon"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path d="M16 16L21 21" />
                            </svg>

                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                        </div>

                        <div className="category-select-container">

                            <button
                                className="category-select"
                                onClick={() => setShowCategories(!showCategories)}
                            >
                                Buscar por categorías
                            </button>

                            {showCategories && (
                                <div className="category-dropdown">
                                    {categories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => {
                                                navigate(`/productos?categoria=${category.id}`);
                                                setShowCategories(!showCategories);
                                            }}
                                        >
                                            {category.name}
                                        </button>
                                    ))}

                                </div>
                            )}
                        </div>
                        <button
                            className="search-button"
                            aria-label="Buscar"
                            onClick={() => navigate(`/productos?busqueda=${encodeURIComponent(search)}`)}
                        >

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <circle cx="11" cy="11" r="7" />
                                <path d="M16 16L21 21" />

                            </svg>

                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}