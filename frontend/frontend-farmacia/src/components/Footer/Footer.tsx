import "./Footer.css";

export default function Footer() {

    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-brand">

                    <a href="/" className="footer-logo">

                        <div className="footer-logo-icon">+</div>

                        <div className="footer-logo-text">
                            <span>Farmacia</span>
                            <strong>Pierabella</strong>
                        </div>

                    </a>

                    <p>Tu salud, nuestra prioridad.</p>

                </div>


                <div className="footer-section">

                    <h3>Navegación</h3>

                    <a href="/">Inicio</a>

                    <a href="/productos">Productos</a>

                    <a href="/categorias">Categorías</a>

                </div>


                <div className="footer-section">

                    <h3>Contacto</h3>

                    <span>Casilda, Santa Fe</span>

                    <span>tel: +54 3464-591098</span>

                    <span>farmaciapierabella@gmail.com</span>

                </div>


                <div className="footer-section">

                    <h3>Seguinos</h3>

                    <div className="footer-social">

                        <a href="#" aria-label="Instagram">Instagram</a>

                        <a href="#" aria-label="Facebook">Facebook</a>

                    </div>

                </div>

            </div>


            <div className="footer-bottom">

                <p>© 2026 Farmacia Pierabella. Todos los derechos reservados.</p>

            </div>

        </footer>
    );
}