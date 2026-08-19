import "./App.css"
import Header from "./components/Header/Header.tsx"
import CategoryForm from "./components/CategoryForm/CategoryForm.tsx"
import CategoryTable from "./components/CategoryTable/CategoryTable.tsx"
import { useEffect, useState } from "react";
import type { ProductCategory } from "./types/productCategory";
import { getProductCategories,deleteProductCategory } from "./services/productCategory.service";
import EditCategoryModal from "./components/EditCategoryModal/EditCategoryModal.tsx";


export default function App(
){
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [editingCategory,setEditingCategory] = useState<ProductCategory | null> (null);
  const [deletingCategory,setDeletingCategory] = useState<ProductCategory | null> (null);
  
  const handleProductCategoryCreated = (productCategory:ProductCategory) => {
    setProductCategories((currentProductCategories) => [
      ...currentProductCategories,productCategory,
    ]);
  };
const hanldeProductCategoryUpdated = (updatedCategory : ProductCategory) => {
   setProductCategories((currentCategories) => currentCategories.map((category) => 
      category.id === updatedCategory.id ? updatedCategory : category));
  }

const handleProductCategoryDeleted = async (id: number) => {
  try {
    await deleteProductCategory(id);

    setProductCategories((currentCategories) =>
      currentCategories.filter(
        (category) => category.id !== id
      )
    );

  } catch (error) {
    console.error(error);
  }
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
        <CategoryTable productCategories = {productCategories} onEdit = {setEditingCategory} onDelete={handleProductCategoryDeleted}/>
      </main>

      {editingCategory && (<EditCategoryModal productCategory={editingCategory} 
                              onUpdated={hanldeProductCategoryUpdated}
                              onClose={() => setEditingCategory(null)}/>    
                  
      )}
  </div>

}
