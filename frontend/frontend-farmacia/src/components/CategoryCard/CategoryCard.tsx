import { Link } from "react-router-dom";
import "./CategoryCard.css";

interface CategoryCardProps {
    id: number;
    name: string;
}

export default function CategoryCard({
    id,
    name
}: CategoryCardProps) {

    return (
        <Link
            to={`/productos?categoria=${id}`}
            className="category-card-link"
        >
            <article className="category-card">
                <h3>{name}</h3>
            </article>
        </Link>
    );
}