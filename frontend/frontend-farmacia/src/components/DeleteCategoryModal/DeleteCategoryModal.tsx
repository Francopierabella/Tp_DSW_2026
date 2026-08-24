import "./DeleteCategoryModal.css"
interface DeleteModalProps {
    categoryName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteModal({
    categoryName,
    onConfirm,
    onCancel
}: DeleteModalProps) {

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Eliminar categoría</h2>
                <p>¿Seguro que deseas eliminar la categoría<strong> "{categoryName}"</strong>?</p>
                <div className="modal-actions">
                    <button onClick={onCancel}> Cancelar</button>
                    <button onClick={onConfirm} className="btn-delete"> Eliminar </button>
                </div>
            </div>
        </div>
    );
}