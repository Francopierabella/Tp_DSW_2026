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

    if (!user || !role) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}