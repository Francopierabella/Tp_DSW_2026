import Header from "../../components/Header/Header";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import Footer from "../../components/Footer/Footer";
import "./Products.css";

export default function Products() {
    return (
        <>
            <Header />

            <main className="products-page">

                <div className="products-container">

                    <div className="products-header">

                        <h1>
                            Todos nuestros productos
                        </h1>

                        <p>
                            Encontrá todo lo que necesitás para tu bienestar.
                        </p>

                    </div>

                    <ProductGrid />

                </div>

            </main>

            <Footer />
        </>
    );
}