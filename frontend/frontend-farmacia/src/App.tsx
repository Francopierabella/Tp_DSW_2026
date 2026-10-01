import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Checkout from "./pages/Checkout/Checkout";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ManagerProducts from "./pages/ManagerProducts/ManagerProducts";
import Manager from "./pages/Manager/Manager";
import ManagerCategories from "./pages/ManagerCategories/ManagerCategories";
import ManagerSales from "./pages/ManagerSales/ManagerSales";

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

        <Route path="/login" element={<Login />} />


        <Route path="/manager" element={
          <ProtectedRoute allowedRole="MANAGER">
            <Manager />
          </ProtectedRoute>
        } />

        <Route path="/manager/products" element={
          <ProtectedRoute allowedRole="MANAGER">
            <ManagerProducts />
          </ProtectedRoute>
        } />
        <Route
          path="/manager/categories"
          element={
            <ProtectedRoute allowedRole="MANAGER">
              <ManagerCategories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager/sales"
          element={
            <ProtectedRoute allowedRole="MANAGER">
              <ManagerSales />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;