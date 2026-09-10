import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Benefits from "../../components/Benefits/Benefits";
import Categories from "../../components/Categories/Categories";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Footer from "../../components/Footer/Footer";

export default function Home() {
    return (
        <>
            <Header />
            <Hero />
            <FeaturedProducts />
            <Categories />
            <Benefits />
            <Footer />
        </>
    )
}