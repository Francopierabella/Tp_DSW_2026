import { IRepository } from "../shared/base.repository";
import { PurchaseOrder } from "./purchaseOrder.entity";

export interface CreatePurchaseOrderItemInput {
    supplierProduct: number;
    quantity: number;
}

export interface CreatePurchaseOrdersInput {
    manager: number;
    items: CreatePurchaseOrderItemInput[];
}
export interface IPurchaseOrderRepository extends IRepository<PurchaseOrder> {
    receive(id: number): Promise<PurchaseOrder | undefined>
    cancel(id: number): Promise<PurchaseOrder | undefined>
    createMultiple(input: CreatePurchaseOrdersInput): Promise<PurchaseOrder[]>;
}