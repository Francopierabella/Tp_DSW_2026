
export interface HealthInsurance {
    id: number;
    name: string;
    coveragePercentage: number;
}

const API_URL = "http://localhost:3000/api/healthInsurances";

export async function getHealthInsurances(): Promise<HealthInsurance[]> {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(
            "No se pudieron obtener las obras sociales"
        );
    }

    return await response.json();
}

