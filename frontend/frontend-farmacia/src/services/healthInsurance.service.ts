
import type { HealthInsurance } from "../types/healthInsurances.ts";
import { API_BASE_URL } from "../config/api";

const API_URL = `${API_BASE_URL}/healthInsurances`;

export async function getHealthInsurances(): Promise<HealthInsurance[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(
            "No se pudieron obtener las obras sociales"
        );
    }

    return await response.json();
}

