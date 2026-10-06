import type { PurchaseOrderItem } from "../types/purchaseOrderItem.js";

const API_URL = "http://localhost:3000/api/purchaseOrderItems";

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