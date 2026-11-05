export interface CustomerProfile {
    id: number;
    firstName: string;
    lastName: string;
    dni: string;
    phoneNumber: string;
    address: string;
    isActive: boolean;
    e_mail: string;
    healthInsurance?: number;
}

export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    dni: string
    isActive: boolean;
}