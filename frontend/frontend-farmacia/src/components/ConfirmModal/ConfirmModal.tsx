import "./ConfirmModal.css";

interface ConfirmModalProps {
    title: string;
    message: string;
    confirmText?: string;
    danger?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}


export default function ConfirmModal({
    title,
    message,
    confirmText = "Eliminar",
    danger = true,
    onConfirm,
    onCancel
}: ConfirmModalProps) {
    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="confirm-modal-actions">
                    <button
                        className="confirm-modal-cancel"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>

                    <button
                        className={`confirm-modal-confirm ${danger ? "danger" : "normal"
                            }`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </div>

            </div>
        </div>
    );
}