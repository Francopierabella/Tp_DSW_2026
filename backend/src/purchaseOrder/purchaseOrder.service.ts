import { PurchaseOrder } from "./purchaseOrder.entity.js";
import { PurchaseOrderRepository } from "./purchaseOrder.repository.js";

export class PurchaseOrderService {
    constructor(private readonly repo: PurchaseOrderRepository) { }

    async findAll(): Promise<PurchaseOrder[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(item: { id: number }): Promise<PurchaseOrder | undefined> {
        return this.repo.findOne({ id: item.id });
    }
    async create(item: PurchaseOrder): Promise<PurchaseOrder | undefined> {
        try {
            const newPurchaseOrder = new PurchaseOrder(
                item.date,
                item.status,
                item.totalAmount,
                item.supplier
            )
            return this.repo.add(newPurchaseOrder);
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("A purchase order with that name already exists.");
            }
            if (error.code === "ER_NO_REFERENCED_ROW_2") {
                throw new Error("The supplier ID entered is invalid");
            }
            throw error;
        }
    }
    async update(id: number, input: PurchaseOrder): Promise<PurchaseOrder | undefined> {
        return await this.repo.update(id, input);
    }
    async remove(id: number): Promise<PurchaseOrder | undefined> {
        return this.repo.delete({ id });
    }
}