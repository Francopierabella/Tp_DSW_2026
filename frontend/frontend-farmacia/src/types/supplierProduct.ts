export interface SupplierProduct {
    id: number;
    product: number;
    supplier: number;
    price: number;
}
export interface SupplierProductResponse {
    id: number;
    supplier: {
        id: number;
        name: string;
    };
    product: {
        id: number;
        name: string;
    };
    price: number;
}