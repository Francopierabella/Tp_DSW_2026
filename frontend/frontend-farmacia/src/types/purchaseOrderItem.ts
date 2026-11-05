
export interface PurchaseOrderItem {
    id: number;
    quantity: number;
    unitPrice: number;
    purchaseOrder: number;
    supplierProduct: number;
}
export interface PurchaseOrderItemResponse {
    id: number;
    quantity: number;
    unitPrice: number;
    purchaseOrder: {
        id: number;
        date: Date;
    };
    supplierProduct: {
        id: number;
        price: number;
        product: {
            id: number;
            name: string;
            brand?: string;
            price?: number;
        };
        supplier: {
            id: number;
            name: string;
        };
    };
}