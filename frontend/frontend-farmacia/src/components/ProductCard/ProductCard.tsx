import { Link } from "react-router-dom";
import "./ProductCard.css";

interface ProductCardProps {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
}

export default function ProductCard({
    id,
    name,
    category,
    price,
    image
}: ProductCardProps) {

    return (
        <Link
            to={`/productos/${id}`}
            className="product-card-link"
        >
            <article className="product-card">

                <div className="product-image">
                    <img src={image} alt={name} />
                </div>

                <div className="product-info">

                    <span className="product-category">
                        {category}
                    </span>

                    <h3>
                        {name}
                    </h3>

                    <div className="product-bottom">

                        <span className="product-price">
                            ${price.toLocaleString("es-AR")}
                        </span>

                        <button
                            className="add-button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
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