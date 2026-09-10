import CategoryCard from "../CategoryCard/CategoryCard";
import "./Categories.css";
import { useEffect, useState } from "react";

interface ProductCategory {
    id: number,
    name: string
}

export default function Categories() {
    const [categories, setCategories] = useState<ProductCategory[] | undefined>([]);
    useEffect(() => {
        fetch("http://localhost:3000/api/productCategories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(error => console.error(error));
    }, [])

    return (
        <section className="categories">
            <div className="categories-container">
                <div className="categories-header">
                    <h2>Explorá por categoría</h2>
                    <p>Encontrá lo que necesitás rápidamente </p>
                </div>
                <div className="categories-grid">

                    {categories?.map(category => (
                        <CategoryCard
                            key={category.id}
                            id={category.id}
                            name={category.name}
                        />

                    ))}

                </div>

            </div>

        </section>
    );
}