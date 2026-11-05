
import { API_BASE_URL } from "../config/api";
import type { CustomerProfile } from "../types/customer";
import type { Customer } from "../types/customer";

const API_URL = `${API_BASE_URL}/customers`;

function getToken() {
    const savedAuth = localStorage.getItem("auth");
    const session = savedAuth ? JSON.parse(savedAuth) : null;

    return session?.token;
}

export async function getCustomers(): Promise<Customer[]> {
    const token = getToken();
    const response = await fetch(`${API_URL}`,
        {
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        });
    if (!response.ok) {
        throw new Error("Error al obtener los clientes");
    }
    return response.json();

}

export async function getCustomerById(id: number): Promise<Customer> {
    const token = getToken();
    const response = await fetch(`${API_URL}/${id}`,
        {
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        });
    if (!response.ok) {
        throw new Error("Error al obtener los clientes");
    }
    return response.json();

}

export async function getCustomerProfile(
    id: number,
    token: string
): Promise<CustomerProfile> {
    const response = await fetch(
        `${API_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    if (!response.ok) {
        throw new Error(
            "No se pudo obtener el perfil del cliente"
        );
    }

    return await response.json();
}

export async function getActiveCustomers(): Promise<Customer[]> {
    const token = getToken();
    const response = await fetch(`${API_URL}/actives`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error("Error al obtener los clientes activos");
    }
    return response.json();
}

export async function activateCustomer(id: number): Promise<Customer> {

    const token = getToken();
    const response = await fetch(`${API_URL}/${id}/activate`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error al activar cliente");
    };

    const result = await response.json();
    return result.data ?? result;

}
export async function desactivateCustomer(id: number) {

    const token = getToken();
    const response = await fetch(`${API_URL}/${id}/desactivate`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error al desactivar cliente");
    };
    const result = await response.json();
    return result.data ?? result;

}


