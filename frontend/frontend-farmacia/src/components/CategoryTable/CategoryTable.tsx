import type { ProductCategory } from "../../types/productCategory.ts"
import "./CategoryTable.css"

interface CategoryTableProps {
    productCategories: ProductCategory[];
    onEdit : (category:ProductCategory) => void;
    onDelete : (productCategory:ProductCategory) => void;
}
                                      // props
export default function CategoryTable({productCategories,onEdit,onDelete} : CategoryTableProps){
    return (
  <div className="card">
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
              <button onClick={() => onEdit(category)}>Editar</button>
              <button onClick={()=> onDelete(category)} className="btn-delete">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>)
}