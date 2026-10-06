
import type { SaleItemResponse } from "../types/saleItem";

const API_URL = "http://localhost:3000/api/saleItems";

export async function getSaleItemsBySale(
    saleId: number
): Promise<SaleItemResponse[]> {

    const savedAuth = localStorage.getItem("auth");
    const session = savedAuth ? JSON.parse(savedAuth) : null;
    const token = session?.token;

    const response = await fetch(
        `${API_URL}/sale/${saleId}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(
            error.message || "Error al obtener los productos de la venta"
        );
    }

    return await response.json();
}

