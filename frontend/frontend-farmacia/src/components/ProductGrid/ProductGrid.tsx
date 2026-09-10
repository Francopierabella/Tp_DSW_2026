import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../services/product.service.ts";
import { getProductCategories } from "../../services/productCategory.service.ts";
import type { Product } from "../../types/product.ts";
import type { ProductCategory } from "../../types/productCategory.ts";

export default function ProductGrid() {

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<ProductCategory[]>([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get("busqueda") ?? "";
    const categoryId = searchParams.get("categoria");
    const filteredProducts = products.filter(product => {
        const matchesCategory =
            !categoryId ||
            product.category === Number(categoryId);

        const matchesSearch =
            product.name
                .toLowerCase()
                .includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    useEffect(() => {
        getProducts()
            .then(data => setProducts(data))
            .catch(error => console.error(error));

        getProductCategories()
            .then(data => setCategories(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="product-grid">

            {filteredProducts.length === 0 ? (
                <div className="no-products">
                    <h2>No encontramos productos</h2>
                    <p>
                        No hay productos que coincidan con tu búsqueda.
                        Probá con otro nombre o categoría.
                    </p>
                </div>
            ) : (
                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            category={
                                categories.find(c => c.id === product.category)?.name
                                ?? "Sin categoría"
                            }
                            price={product.price}
                            image="https://placehold.co/400x300?text=Producto"
                        />
                    ))}
                </div>
            )}
        </div>
    );
}