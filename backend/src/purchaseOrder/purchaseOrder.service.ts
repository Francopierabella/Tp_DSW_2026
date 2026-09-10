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
    async create(input: PurchaseOrder): Promise<PurchaseOrder | undefined> {
        try {
            const order = new PurchaseOrder(
                input.date,
                input.status,
                input.supplier
            )
            return await this.repo.add(order);
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
        const order = await this.repo.findOne({ id });
        if (!order) {
            return undefined;
        }
        order.date = input.date;
        order.status = input.status;
        order.supplier = input.supplier;
        return await this.repo.update(id, order);
    }
    async remove(id: number): Promise<PurchaseOrder | undefined> {
        return await this.repo.delete({ id });
    }
}