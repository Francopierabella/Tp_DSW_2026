import type { Sale, SaleCreateInput, SaleUpdateInput } from "../types/sale";

const API_URL = "http://localhost:3000/api/sales";

export async function getSales(): Promise<Sale[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Error al obtener las ventas");
    }
    return await response.json();
}

export async function getSaleById(id: number): Promise<Sale | undefined> {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
        throw new Error("Error al obtener la venta");
    }
    return await response.json();
}

export async function createSale(sale: SaleCreateInput): Promise<Sale> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sale),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    const result = await response.json();
    return result.data;
}

export async function updateSale(id: number, sale: SaleUpdateInput): Promise<Sale> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(sale),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const result = await response.json();

    return result.data;
}

export async function remove(id: number): Promise<Sale> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    const result = await response.json();
    return result.data;
}

export async function createSaleItem(item: { quantity: number; sale: number; product: number }) {
    const response = await fetch("http://localhost:3000/api/saleItems", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }
    return await response.json();
}