export type PurchaseOrderStatus =
    | "pending"
    | "cancelled"
    | "received";

export interface PurchaseOrder {
    id: number;
    date: string;
    status: PurchaseOrderStatus;
    totalAmount: number;
    supplier: number;
}