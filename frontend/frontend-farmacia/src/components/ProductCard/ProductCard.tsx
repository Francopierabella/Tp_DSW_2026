import { Link } from "react-router-dom";
import "./ProductCard.css";
import type { Product } from "../../types/product";
import { useCart } from "../../context/CartContext";

interface ProductCardProps {
    product: Product;
    category: string;
    image: string;
}

export default function ProductCard({
    product,
    category,
    image
}: ProductCardProps) {

    const { addToCart } = useCart();

    return (
        <Link
            to={`/productos/${product.id}`}
            className="product-card-link"
        >
            <article className="product-card">

                <div className="product-image">
                    <img src={image} alt={product.name} />
                </div>

                <div className="product-info">

                    <span className="product-category">
                        {category}
                    </span>

                    <h3>
                        {product.name}
                    </h3>

                    <div className="product-bottom">

                        <span className="product-price">
                            ${product.price.toLocaleString("es-AR")}
                        </span>

                        <button
                            className="add-button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                addToCart(product);
                            }}
                        >
                            Agregar
                        </button>

                    </div>

                </div>

            </article>
        </Link>
    );
}