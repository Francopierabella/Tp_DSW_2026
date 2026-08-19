import "./App.css"
import Header from "./components/Header/Header.tsx"
import CategoryForm from "./components/CategoryForm/CategoryForm.tsx"
import CategoryTable from "./components/CategoryTable/CategoryTable.tsx"
import { useEffect, useState } from "react";
import type { ProductCategory } from "./types/productCategory";
import { getProductCategories } from "./services/productCategory.service";

export default function App(
){
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const handleProductCategoryCreated = (productCategory:ProductCategory) => {
    setProductCategories((currentProductCategories) => [
      ...currentProductCategories,productCategory,
    ]);
  };

  useEffect(() => {
    getProductCategories().then((data) => {
      setProductCategories(data);
    }).catch((error) => {
      console.error(error);
    })
  },[]);
  return <div className="app">
      <Header />
      <main className="container">
        <CategoryForm onProductCategoryCreated = {handleProductCategoryCreated}/>
        <CategoryTable productCategories = {productCategories} />
      </main>
  </div>

}
