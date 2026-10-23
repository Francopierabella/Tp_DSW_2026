import { API_BASE_URL } from "../config/api";

export interface CustomerProfile {
    id: number;
    firstName: string;
    lastName: string;
    dni: string;
    phoneNumber: string;
    address: string;
    e_mail: string;
    healthInsurance?: number;
}

const API_URL = `${API_BASE_URL}/customers`;



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

