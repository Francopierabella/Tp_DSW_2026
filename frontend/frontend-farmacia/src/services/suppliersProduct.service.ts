import type { SupplierProduct } from "../types/supplierProduct.js";

const API_URL = "http://localhost:3000/api/supplierProducts";

function getToken() {
    const savedAuth = localStorage.getItem("auth");
    const session = savedAuth ? JSON.parse(savedAuth) : null;

    return session?.token;
}

export async function getSupplierProducts(): Promise<SupplierProduct[]> {

    const token = getToken();

    const response = await fetch(API_URL, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Error al obtener las ofertas de los proveedores");
    }

    return await response.json();
}

export async function getSupplierProductsByProduct(
    productId: number
): Promise<SupplierProduct[]> {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/product/${productId}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            "Error al obtener los proveedores del producto"
        );
    }

    return await response.json();
}

export async function getSupplierProductsBySupplier(supplierId: number): Promise<SupplierProduct[]> {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/supplier/${supplierId}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            "Error al obtener los productos del proveedor"
        );
    }

    return await response.json();
}
export async function getSupplierProduct(
    productId: number,
    supplierId: number
): Promise<SupplierProduct> {

    const token = getToken();

    const response = await fetch(
        `${API_URL}/product/${productId}/supplier/${supplierId}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(
            "Error al obtener la oferta del proveedor"
        );
    }

    return await response.json();
}