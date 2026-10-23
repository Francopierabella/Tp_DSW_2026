import { LockMode } from "@mikro-orm/core";
import { orm } from "../shared/db/orm.js";
import { PurchaseOrder } from "./purchaseOrder.entity.js";
import { IPurchaseOrderRepository } from "./purchaseOrder.interface.js";
import { PurchaseOrderStatus } from "./purchaseOrder.entity.js";
import { PurchaseOrderItem } from "../purchaseOrderItem/purchaseOrderItem.entity.js";
import { Product } from "../product/product.entity.js";

export class PurchaseOrderRepository implements IPurchaseOrderRepository {
    public async findAll(): Promise<PurchaseOrder[] | undefined> {
        return await orm.em.find(PurchaseOrder, {});
    }

    public async findOne(item: { id: number }): Promise<PurchaseOrder | undefined> {
        const found = await orm.em.findOne(PurchaseOrder, { id: item.id });
        return found ?? undefined;
    }

    public async add(item: PurchaseOrder): Promise<PurchaseOrder | undefined> {
        const created = orm.em.create(PurchaseOrder, item);
        await orm.em.persistAndFlush(created);
        return created;
    }

    public async update(id: number, input: Partial<PurchaseOrder>): Promise<PurchaseOrder | undefined> {
        const found = await orm.em.findOne(PurchaseOrder, { id });
        if (!found) {
            return undefined;
        }
        if (input.date !== undefined) {
            found.date = input.date;
        }
        if (input.status !== undefined) {
            found.status = input.status;
        }
        if (input.totalAmount !== undefined) {
            found.totalAmount = input.totalAmount;
        }
        if (input.supplier !== undefined) {
            found.supplier = input.supplier;
        }
        await orm.em.flush();
        return found;
    }

    public async delete(item: { id: number }): Promise<PurchaseOrder | undefined> {
        const found = await this.findOne({ id: item.id });
        if (!found) {
            return undefined;
        }
        await orm.em.removeAndFlush(found);
        return found;
    }
    public async receive(id: number): Promise<PurchaseOrder | undefined> {
        return await orm.em.transactional(async (em) => {
            const purchaseOrder = await em.findOne(PurchaseOrder, { id }, { lockMode: LockMode.PESSIMISTIC_WRITE });
            if (!purchaseOrder) return undefined;
            if (purchaseOrder.status !== PurchaseOrderStatus.Pending)
                throw new Error("Only pending purchase orders can be received");
            const items = await em.find(PurchaseOrderItem, { purchaseOrder: id });
            for (const item of items) {
                if (item.quantity <= 0) {
                    throw new Error("Order Item quantity must be greater than zero");
                }
                const product = await em.findOne(Product, { id: item.product }, { lockMode: LockMode.PESSIMISTIC_WRITE });
                if (!product)
                    throw new Error(`Product ${item.product} not found`);
                product.stock += item.quantity;
                em.flush();
            }
            purchaseOrder.status = PurchaseOrderStatus.Received;
            await em.flush();
            return purchaseOrder;
        })
    }
}