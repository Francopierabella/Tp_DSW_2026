import { IRepository } from "../shared/base.repository.js";
import { orm } from "../shared/db/orm.js";
import { PurchaseOrderItem } from "./purchaseOrderItem.entity.js";


export class PurchaseOrderItemRepository implements IRepository<PurchaseOrderItem> {
    async findAll(): Promise<PurchaseOrderItem[] | undefined> {
        return await orm.em.find(PurchaseOrderItem, {});
    }
    async findOne(item: { id: number }): Promise<PurchaseOrderItem | undefined> {
        const found = await orm.em.findOne(PurchaseOrderItem, { id: item.id });
        return found ?? undefined;
    }
    async add(item: PurchaseOrderItem): Promise<PurchaseOrderItem | undefined> {
        try {
            const created = orm.em.create(PurchaseOrderItem, item);
            await orm.em.persistAndFlush(created);
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
        const found = await orm.em.findOne(PurchaseOrderItem, { id });
        if (!found) {
            return undefined;
        }
        orm.em.assign(found, input);
        await orm.em.flush();
        return found;
    }
    async delete(item: { id: number }): Promise<PurchaseOrderItem | undefined> {
        const found = await this.findOne({ id: item.id });
        if (!found) {
            return undefined;
        }
        await orm.em.removeAndFlush(found);
        return found;
    }
}