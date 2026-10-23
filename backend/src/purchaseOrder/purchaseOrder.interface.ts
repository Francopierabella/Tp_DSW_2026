import { IRepository } from "../shared/base.repository";
import { PurchaseOrder } from "./purchaseOrder.entity";

export interface IPurchaseOrderRepository extends IRepository<PurchaseOrder> {
    receive(id: number): Promise<PurchaseOrder | undefined>
}