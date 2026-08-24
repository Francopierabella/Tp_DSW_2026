import { useState } from "react"
import "./CategoryForm.css"
import { createProductCategory } from "../../services/productCategory.service.ts"
import type { ProductCategory } from "../../types/productCategory.ts"

interface ProductCategoryFromProps{
    onProductCategoryCreated : (productCategory:ProductCategory) => void;
}
// Hacemos esto para que typescript sepa de que tipo es la prop que recibe

export default function CategoryForm({onProductCategoryCreated} : ProductCategoryFromProps){
    
    const [name,setName] = useState('')
    const [error,setError] = useState("")

    const handleSubmit = async () => {
        try{
            setError("")
            const newProductCategory = await createProductCategory(name);
            onProductCategoryCreated(newProductCategory);
            setName("");
        }catch(error){
            // Verificamos que el objeto capturado sea una instancia de Error
            // para poder acceder de forma segura a su propiedad message.
            if(error instanceof Error)
            setError(error.message);
        }
    }
    return <div className="card">
            <h2>Nueva Categoria</h2>
            <div className="form-row">
            <input  type="text" placeholder="Nombre de la categoría" 
            value={name}
            onChange={(event) => {setName(event.target.value);setError("");}}/>
            {/* esto es , cuando cambia el contenido del imput, ejecuta setName
            luego target significa "el elemento que originó el evento, en este caso seria el input"
            y el .value seria el valor del input en ese momento
            entonces seteo el name de la category con esto. */}
            <button onClick={handleSubmit}>Agregar</button>
            </div>
            {error && <p className="error-message">{error}</p>}
    </div>
}