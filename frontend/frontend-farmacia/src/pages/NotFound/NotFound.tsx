import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
    return (
        <main className="not-found">
            <div className="not-found__content">
                <span className="not-found__code">404</span>

                <h1>¡Ups! Página no encontrada</h1>

                <p>
                    La página que estás buscando no existe.
                </p>

                <Link to="/" className="not-found__button">
                    Volver al inicio
                </Link>
            </div>
        </main>
    );
}

export default NotFound;