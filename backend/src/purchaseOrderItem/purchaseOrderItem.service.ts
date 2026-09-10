import { IRepository } from "../shared/base.repository.js";
import { PurchaseOrderItem } from "./purchaseOrderItem.entity.js";


export class PurchaseOrderItemService {
    constructor(private readonly repo: IRepository<PurchaseOrderItem>) { };
    async findAll(): Promise<PurchaseOrderItem[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(id: number): Promise<PurchaseOrderItem | undefined> {
        return await this.repo.findOne({ id });
    }
    async create(input: PurchaseOrderItem): Promise<PurchaseOrderItem | undefined> {
        try {

            const purchaseOrderItem = new PurchaseOrderItem(
                input.quantity,
                input.unitPrice,
                input.purchaseOrder,
                input.product
            )
            return await this.repo.add(purchaseOrderItem);
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("A purchase order item with that name already exists.");
            }
            if (error.code === "ER_NO_REFERENCED_ROW_2") {
                throw new Error("The purchase order or product ID entered is invalid");
            }
            throw error;
        }
    }
    async update(id: number, input: PurchaseOrderItem): Promise<PurchaseOrderItem | undefined> {
        return await this.repo.update(id, input);
    }
    async remove(id: number): Promise<PurchaseOrderItem | undefined> {
        return await this.repo.delete({ id });
    }
}
