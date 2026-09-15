import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Checkout from "./pages/Checkout/Checkout";

//React Router se encarga de relacionar una URL con un componente de React.
function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/productos" element={<Products />} />

        <Route path="/categorias" element={<CategoriesPage />} />

        <Route path="/productos/:id" element={<ProductDetail />} />

        <Route path="/checkout" element={<Checkout />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;