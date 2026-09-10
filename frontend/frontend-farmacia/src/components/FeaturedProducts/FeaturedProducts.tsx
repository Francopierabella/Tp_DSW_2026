import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./FeaturedProducts.css";
import { getProducts } from "../../services/product.service.ts";
import { getProductCategories } from "../../services/productCategory.service.ts";
import type { Product } from "../../types/product.ts";
import type { ProductCategory } from "../../types/productCategory.ts";

export default function FeaturedProducts() {

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<ProductCategory[]>([]);

    useEffect(() => {

        getProducts()
            .then(data => setProducts(data))
            .catch(error => console.error("Error al obtener productos:", error));

        getProductCategories()
            .then(data => setCategories(data))
            .catch(error => console.error("Error al obtener categorías:", error));

    }, []);

    const featuredProducts = products.filter(
        product => product.isFeatured === true
    );

    return (
        <section className="featured-products">

            <div className="featured-products-container">

                <div className="featured-products-header">
                    <h2>Productos destacados</h2>
                    <p>Conoce algunos de nuestros productos destacados.</p>
                </div>
                <div className="featured-products-grid">

                    {featuredProducts.length === 0 ? (

                        <p>No hay productos destacados.</p>

                    ) : (

                        featuredProducts.map(product => (

                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                category={
                                    categories.find(
                                        category => category.id === product.category
                                    )?.name ?? "Sin categoría"
                                }
                                price={product.price}
                                image="https://placehold.co/400x300?text=Producto"
                            />

                        )))
                    }

                </div>

            </div>

        </section>
    );


}