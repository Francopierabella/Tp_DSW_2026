import { useState } from "react";
import type { ProductCategory } from "../../types/productCategory";
import { updateProductCategory } from "../../services/productCategory.service";
import "./EditCategoryModal.css";

interface EditCategoryModalProps {
  productCategory: ProductCategory;
  onUpdated: (productCategory: ProductCategory) => void;
  onClose: () => void;
}

export default function EditCategoryModal({
  productCategory,
  onUpdated,
  onClose,
}: EditCategoryModalProps) {

  const [name, setName] = useState(productCategory.name);

  const handleSubmit = async () => {
    try {
      const updatedProductCategory =
        await updateProductCategory(productCategory.id, name);

      onUpdated(updatedProductCategory);
      onClose();

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Modificar categoría</h2>

        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <div className="modal-actions">

          <button onClick={onClose}>
            Cancelar
          </button>

          <button onClick={handleSubmit}>
            Guardar
          </button>

        </div>

      </div>

    </div>
  );
}