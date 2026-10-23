import type { PurchaseOrderItem, PurchaseOrderItemResponse } from "../types/purchaseOrderItem.js";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/purchaseOrderItems`;


function getToken() {
    const savedAuth = localStorage.getItem("auth");
    const session = savedAuth ? JSON.parse(savedAuth) : null;

    return session?.token;
}

interface CreatePurchaseOrderItemInput {
    quantity: number;
    purchaseOrder: number;
    product: number;
}

export async function createPurchaseOrderItem(
    item: CreatePurchaseOrderItemInput
): Promise<PurchaseOrderItem> {
    const token = getToken();

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(item)
    });

    if (!response.ok) {
        throw new Error("Error al crear el detalle del pedido de compra");
    }

    return await response.json();
}

export async function getPurchaseOrderItemsByOrder(
    orderId: number
): Promise<PurchaseOrderItemResponse[]> {
    const token = getToken();

    const response = await fetch(
        `${API_URL}/purchaseOrder/${orderId}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(
            error?.message || "Error al obtener los productos del pedido de compra"
        );
    }

    return await response.json();
}