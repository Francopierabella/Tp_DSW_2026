import { useEffect } from "react";
import "./Toast.css";
import { createPortal } from "react-dom";

interface ToastProps {
    message: string;
    onClose: () => void;
}

// Lo que hace createPortal es renderizar el componente en cualquier parte del DOM,
// sin estar limitado por la estructura de componentes de React.
// En este caso, lo renderiza en el body.

// "Aunque este componente venga desde ProductCard, poné visualmente este elemento directamente dentro de <body>"

// Usa useEffect y setTimeout para que el toast desaparezca solo.


export default function Toast({ message, onClose }: ToastProps) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    return createPortal(
        <div className="toast">
            <span className="toast-icon">✓</span>
            <span>{message}</span>
        </div>,
        document.body
    );
}