import type { PurchaseOrder, PurchaseOrderStatus } from "../types/purchaseOrder.js";

const API_URL = "http://localhost:3000/api/purchaseOrders";

function getToken() {
    const savedAuth = localStorage.getItem("auth");
    const session = savedAuth ? JSON.parse(savedAuth) : null;

    return session?.token;
}

export async function getPurchaseOrders(): Promise<PurchaseOrder[]> {
    const token = getToken();

    const response = await fetch(API_URL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error al obtener los pedidos de compra");
    }

    return await response.json();
}
export async function getPurchaseOrderById(
    id: number
): Promise<PurchaseOrder> {
    const token = getToken();

    const response = await fetch(`${API_URL}/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error al obtener el pedido de compra");
    }

    return await response.json();
}

export async function createPurchaseOrder(
    purchaseOrder: Omit<PurchaseOrder, "id" | "totalAmount">
): Promise<PurchaseOrder> {
    const token = getToken();

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(purchaseOrder)
    });

    if (!response.ok) {
        console.error(response.json())
        throw new Error("Error al crear el pedido de compra");
    }

    return await response.json();
}

export async function updatePurchaseOrder(
    id: number,
    status: PurchaseOrderStatus
): Promise<PurchaseOrder> {
    const token = getToken();

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            status
        })
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el pedido de compra");
    }

    return await response.json();
}