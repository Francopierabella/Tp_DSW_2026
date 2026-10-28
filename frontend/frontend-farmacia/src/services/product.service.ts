
import type { Product } from "../types/product.ts";
import type { ProductInput } from "../types/product.ts";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/products`;



function getToken() {
    const savedAuth = localStorage.getItem("auth");
    const session = savedAuth ? JSON.parse(savedAuth) : null;

    return session?.token;
}

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
    const token = getToken();

    if (!token) {
        throw new Error("No hay sesión activa");
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const result = await response.json();

    return result.data ?? result;
}

export async function updateProduct(
    id: number,
    product: ProductInput //el input es la estructura que usamos para crear/actualizar un producto.
): Promise<Product> {
    const token = getToken();

    if (!token) {
        throw new Error("No hay sesión activa");
    }
    console.log(product);
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
    });


    if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error(error.message);
    }

    const result = await response.json();

    return result.data ?? result;
}

export async function deleteProduct(id: number): Promise<Product> {
    const token = getToken();

    if (!token) {
        throw new Error("No hay sesión activa");
    }

    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
    }

    const result = await response.json();

    return result.data ?? result;
}
