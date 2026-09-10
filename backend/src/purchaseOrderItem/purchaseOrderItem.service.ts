import { IRepository } from "../shared/base.repository.js";
import { PurchaseOrderItem } from "./purchaseOrderItem.entity.js";
import { PurchaseOrder } from "../purchaseOrder/purchaseOrder.entity.js";
import { PurchaseOrderRepository } from "../purchaseOrder/purchaseOrder.repository.js";
import { PurchaseOrderItemRepository } from "./purchaseOrderItem.repository.js";
import { ProductRepository } from "../product/product.repository.js";


export class PurchaseOrderItemService {
    constructor(
        private readonly repo: PurchaseOrderItemRepository,
        private readonly purchaseOrderRepo: PurchaseOrderRepository,
        private readonly productRepo: ProductRepository
    ) { };
    async findAll(): Promise<PurchaseOrderItem[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(id: number): Promise<PurchaseOrderItem | undefined> {
        return await this.repo.findOne({ id });
    }
    async create(input: PurchaseOrderItem): Promise<PurchaseOrderItem | undefined> {

        const product = await this.productRepo.findOne({ id: input.product });
        if (!product) {
            throw new Error("The product ID entered is invalid");
        }
        try {

            const purchaseOrderItem = new PurchaseOrderItem(
                input.quantity,
                product.price,
                input.purchaseOrder,
                input.product,
            )
            const created = await this.repo.add(purchaseOrderItem);
            if (created) {
                await this.updatePurchaseOrderTotal(input.purchaseOrder);
            }
            return created;
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
        const updated = await this.repo.update(id, input);
        if (updated) {
            await this.updatePurchaseOrderTotal(updated.purchaseOrder);
        }
        return updated
    }
    async remove(id: number): Promise<PurchaseOrderItem | undefined> {
        return await this.repo.delete({ id });
    }
    private async updatePurchaseOrderTotal(orderId: number): Promise<void> {
        const orderItems = await this.repo.findByPurchaseOrder(orderId);
        let total = 0;
        if (orderItems) {
            for (const item of orderItems) {
                total += item.quantity * item.unitPrice;
            }
        }
        await this.purchaseOrderRepo.update(orderId, { totalAmount: total });
    }
}
