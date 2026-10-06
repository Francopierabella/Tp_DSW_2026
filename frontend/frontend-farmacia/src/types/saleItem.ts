export interface SaleItemResponse {
    id: number;
    quantity: number;
    unitPrice: number;
    sale: number;
    product: {
        id: number;
        name: string;
        description: string;
        brand: string;
        gender: string;
        price: number;
        stock: number;
        isFeatured: boolean;
        category: number;
    };
}
export interface SaleItemInput {
    product: number;
    quantity: number;
}


export interface SaleItem {
    id: number;
    product: number;
    quantity: number;
}