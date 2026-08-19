import { useState } from "react"
import "./CategoryForm.css"
import { createProductCategory } from "../../services/productCategory.service.ts"
import type { ProductCategory } from "../../types/productCategory.ts"

interface ProductCategoryFromProps{
    onProductCategoryCreated : (productCategory:ProductCategory) => void;
}

export default function CategoryForm({onProductCategoryCreated} : ProductCategoryFromProps){
    
    const [name,setName] = useState('')

    const handleSubmit = async () => {
        try{
            const newProductCategory = await createProductCategory(name);
            onProductCategoryCreated(newProductCategory);
            setName("");
        }catch(error){
            console.error(error)
        }
    }
    return <div className="card">
            <h2>Nueva Categoria</h2>
            <div className="form-row">
            <input  type="text" placeholder="Nombre de la categoría" 
            value={name}
            onChange={(event) => setName(event.target.value)}/>
            <button onClick={handleSubmit}>Agregar</button>
            </div>
    </div>
}