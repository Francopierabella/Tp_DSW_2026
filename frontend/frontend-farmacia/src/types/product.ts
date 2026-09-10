export interface Product {
    id: number;
    name: string;
    description: string;
    brand: string;
    gender: string;
    price: number;
    stock: number;
    category: number;
    isFeatured: boolean;
}

export interface ProductInput {
    name: string;
    description: string;
    brand: string;
    gender: string;
    price: number;
    stock: number;
    category: number;
    isFeatured: boolean;
}