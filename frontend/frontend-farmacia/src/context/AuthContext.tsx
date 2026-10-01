import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface User {
    id: number;
    e_mail: string;
    firstName: string;
    lastName: string;
}

interface AuthSession {
    user: User;
    role: "CUSTOMER" | "MANAGER";
    token: string;
}

interface AuthContextType {
    user: User | null;
    role: "CUSTOMER" | "MANAGER" | null;
    token: string | null;
    login: (
        user: User,
        role: "CUSTOMER" | "MANAGER",
        token: string
    ) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({ children }: AuthProviderProps) {

    const [session, setSession] = useState<AuthSession | null>(() => {

        const savedSession = localStorage.getItem("auth");

        if (!savedSession) {
            return null;
        }

        return JSON.parse(savedSession);
    });

    const login = (
        user: User,
        role: "CUSTOMER" | "MANAGER",
        token: string
    ) => {

        const newSession: AuthSession = {
            user,
            role,
            token
        };

        setSession(newSession);

        localStorage.setItem(
            "auth",
            JSON.stringify(newSession)
        );
    };

    const logout = () => {

        setSession(null);

        localStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider
            value={{
                user: session?.user ?? null,
                role: session?.role ?? null,
                token: session?.token ?? null,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within an AuthProvider"
        );
    }

    return context;
}