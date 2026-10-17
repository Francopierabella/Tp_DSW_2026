
export interface PurchaseOrderItem {
    id: number;
    quantity: number;
    unitPrice: number;
    purchaseOrder: number;
    product: number;
}
export interface PurchaseOrderItemResponse {
    id: number;
    quantity: number;
    unitPrice: number;
    purchaseOrder: {
        id: number;
        Date: Date;
    };
    product: {
        id: number;
        name: string;
        brand?: string;
        price?: number;
    };
    supplier: {
        id: number;
        name: string;
    }
}