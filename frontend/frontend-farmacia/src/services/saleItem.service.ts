
import type { SaleItemResponse } from "../types/saleItem";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/saleItems`;

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

