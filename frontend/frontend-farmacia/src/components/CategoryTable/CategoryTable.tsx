import type { ProductCategory } from "../../types/productCategory.ts"
import "./CategoryTable.css"

interface CategoryTableProps {
    productCategories: ProductCategory[];
}

export default function CategoryTable({productCategories} : CategoryTableProps){
    return  <div className="card">
        <h2>Categorías</h2>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>

             <tbody>
        {productCategories.map((category) => (
          <tr key={category.id}>
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>
              <button>Editar</button>
              <button>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
          </table>
    </div>
}