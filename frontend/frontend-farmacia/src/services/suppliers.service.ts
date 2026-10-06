import type { Supplier } from "../types/supplier.js";

const API_URL = "http://localhost:3000/api/suppliers";

function getToken() {
    const savedAuth = localStorage.getItem("auth");
    const session = savedAuth ? JSON.parse(savedAuth) : null;

    return session?.token;
}

export async function getSuppliers(): Promise<Supplier[]> {

    const token = getToken();

    const response = await fetch(API_URL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error al obtener los proveedores");
    }

    return await response.json();
}

export async function getSupplierById(
    id: number
): Promise<Supplier> {

    const token = getToken();

    const response = await fetch(`${API_URL}/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error al obtener el proveedor");
    }

    return await response.json();
}