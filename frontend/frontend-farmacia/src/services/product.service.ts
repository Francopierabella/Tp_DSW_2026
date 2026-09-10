
import type { Product } from "../types/product.ts";
import type { ProductInput } from "../types/product.ts";

const API_URL = "http://localhost:3000/api/products";

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Error al obtener los productos");
    }

    return await response.json();
}

export async function getProductById(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener el producto");
    }

    return await response.json();
}

export async function createProduct(product: ProductInput): Promise<Product> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const result = await response.json();

    return result.data;
}

export async function updateProduct(
    id: number,
    product: ProductInput
): Promise<Product> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const result = await response.json();

    return result.data;
}

export async function deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el producto");
    }
}

