import { IRepository } from "../shared/base.repository.js";
import { PurchaseOrderItem } from "./purchaseOrderItem.entity.js";
import { PurchaseOrder } from "../purchaseOrder/purchaseOrder.entity.js";
import { PurchaseOrderRepository } from "../purchaseOrder/purchaseOrder.repository.js";
import { PurchaseOrderItemRepository } from "./purchaseOrderItem.repository.js";
import { ProductRepository } from "../product/product.repository.js";
import { SupplierProductRepository } from "../supplierProduct/supplierProduct.repository.js";


export class PurchaseOrderItemService {
    constructor(
        private readonly repo: PurchaseOrderItemRepository,
        private readonly purchaseOrderRepo: PurchaseOrderRepository,
        private readonly productRepo: ProductRepository,
        private readonly supplierProductRepo: SupplierProductRepository
    ) { };
    async findAll(): Promise<PurchaseOrderItem[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(id: number): Promise<PurchaseOrderItem | undefined> {
        return await this.repo.findOne({ id });
    }
    async create(input: { quantity: number; purchaseOrder: number; supplierProduct: number }) {
        const purchaseOrder = await this.purchaseOrderRepo.findOne({ id: input.purchaseOrder });
        if (!purchaseOrder) {
            throw new Error("The purchase order ID entered is invalid");
        }

        const supplierProduct = await this.supplierProductRepo.findOne({ id: input.supplierProduct });
        if (!supplierProduct) {
            throw new Error("The selected SupplierProduct does not exist");
        }

        const purchaseOrderItem = new PurchaseOrderItem(
            input.quantity,
            supplierProduct.price,
            input.purchaseOrder,
            input.supplierProduct
        );

        const created = await this.repo.add(purchaseOrderItem);
        if (created) {
            await this.updatePurchaseOrderTotal(input.purchaseOrder);
        }
        return created;
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
    async findByPurchaseOrder(orderId: number): Promise<PurchaseOrderItem[]> {
        const purchaseOrder = await this.purchaseOrderRepo.findOne({ id: orderId });
        if (!purchaseOrder) {
            throw new Error("The purchase order ID entered is invalid");
        }
        return (await this.repo.findByPurchaseOrder(orderId)) ?? [];
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
