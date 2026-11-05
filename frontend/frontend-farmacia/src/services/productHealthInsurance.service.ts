import type { ProductHealthInsurance, ProductHealthInsuranceInput } from "../types/productHealthInsurance.js";
import { API_BASE_URL } from "../config/api.js";

const API_URL = `${API_BASE_URL}/productHealthInsurances`;

function getToken() {
    const savedAuth = localStorage.getItem("auth");
    const session = savedAuth ? JSON.parse(savedAuth) : null;
    return session?.token;
}

export const productHealthInsuranceService = {
    // Obtener todas las coberturas
    async getAllCoverages(): Promise<ProductHealthInsurance[]> {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error al obtener las coberturas: ${response.statusText}`);
        }
        return response.json();
    },

    // Obtener cobertura por ID
    async getProductHealthInsuranceById(id: number): Promise<ProductHealthInsurance> {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error(`Error al obtener la cobertura: ${response.statusText}`);
        }
        return response.json();
    },

    // Crear nueva cobertura (MANAGER)
    async createProductHealthInsurance(data: ProductHealthInsuranceInput): Promise<ProductHealthInsurance> {
        const token = getToken();
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error al crear la cobertura: ${response.statusText}`);
        }
        return response.json();
    },

    // Actualizar cobertura (MANAGER)
    async update(id: number, data: Partial<ProductHealthInsuranceInput>): Promise<ProductHealthInsurance> {
        const token = getToken();
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Error al actualizar la cobertura: ${response.statusText}`);
        }
        return response.json();
    },

    // Eliminar cobertura (MANAGER)
    async delete(id: number): Promise<void> {
        const token = getToken();
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar la cobertura: ${response.statusText}`);
        }
    },

    // Obtener coberturas por producto
    async getByProduct(productId: number): Promise<ProductHealthInsurance[]> {
        const response = await fetch(`${API_URL}/product/${productId}`);
        if (!response.ok) {
            throw new Error(`Error al obtener las coberturas del producto: ${response.statusText}`);
        }
        return response.json();
    },

    // Obtener coberturas por obra social
    async getByHealthInsurance(healthInsuranceId: number): Promise<ProductHealthInsurance[]> {
        const response = await fetch(`${API_URL}/healthInsurance/${healthInsuranceId}`);
        if (!response.ok) {
            throw new Error(`Error al obtener las coberturas de la obra social: ${response.statusText}`);
        }
        return response.json();
    }
};