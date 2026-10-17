import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
    allowedRole?: "CUSTOMER" | "MANAGER";
}

export default function ProtectedRoute({
    children,
    allowedRole
}: ProtectedRouteProps) {

    const { user, role } = useAuth();

    // Si no hay usuario o rol, redirijo al login.
    if (!user || !role) {
        return <Navigate to="/login" replace />;
    }

    // Si se especifica un rol permitido y el rol del usuario no coincide, lo redirijo a la home.
    if (allowedRole && role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    // Si no hay restricciones, devuelvo el componente hijo.
    return <>{children}</>;
}