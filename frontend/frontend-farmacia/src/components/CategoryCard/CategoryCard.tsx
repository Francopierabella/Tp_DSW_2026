import { Link } from "react-router-dom";
import "./CategoryCard.css";
import type { ProductCategory } from "../../types/productCategory";

export default function CategoryCard({
    id,
    name,
}: ProductCategory) {
    return (
        <Link // Sirve para crear un enlace de navegación dentro de nuestra aplicación React.
            to={`/productos?categoria=${id}`} //Estamos usando la misma /productos, pero agregando un query parameter llamado categoria.
            // React Router cambia la URL y muestra la ruta correspondiente sin recargar toda la aplicación.
            className="category-card-link">

            <article className="category-card">
                <h3>{name}</h3>
            </article>

        </Link>
    );
}