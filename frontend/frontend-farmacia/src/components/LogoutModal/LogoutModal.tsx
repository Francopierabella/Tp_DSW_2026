import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import "./LogoutModal.css";
export function LogoutModal({ onClose }: { onClose: () => void }) {
    const { logout } = useAuth();
    const { clearCart } = useCart();
    return (
        <div className="logout-modal">
            <div className="logout-modal-content">
                <div className="logout-modal-header">
                    <h2 className="logout-modal-title">Cerrar Sesión</h2>
                    <button className="logout-modal-close" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="logout-modal-body">
                    <p className="logout-modal-text">¿Estás seguro de que quieres cerrar sesión?</p>
                </div>
                <div className="logout-modal-footer">
                    <button className="logout-modal-cancel" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="logout-modal-confirm" onClick={() => {
                        logout();
                        onClose();
                        clearCart();
                    }}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    );
}