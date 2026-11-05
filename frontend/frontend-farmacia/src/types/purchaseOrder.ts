export type PurchaseOrderStatus =
    | "pending"
    | "cancelled"
    | "received";

interface Manager {
    id: number;
    e_mail: string;
    firstName: string;
    lastName: string;
}
interface Supplier {
    id: number;
    e_mail: string;
    name: string;

}

export interface PurchaseOrder {
    id: number;
    date: string;
    status: PurchaseOrderStatus;
    totalAmount: number;
    manager: Manager;
    supplier: Supplier;
}

export interface CreatePurchaseOrderItemInput {
    supplierProduct: number;
    quantity: number;
}

export interface CreatePurchaseOrdersInput {
    items: CreatePurchaseOrderItemInput[];
}