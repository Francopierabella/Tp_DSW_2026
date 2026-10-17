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

const API_URL = "http://localhost:3000/api/customers";



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

