import Header from "../../components/Header/Header";
import Categories from "../../components/Categories/Categories";
import Footer from "../../components/Footer/Footer";
import "./CategoriesPage.css";

export default function CategoriesPage() {
    return (
        <>
            <Header />
            <main className="categories-page">
                <div className="categories-page-container">
                    <Categories />
                </div>
            </main>
            <Footer />
        </>
    );
}