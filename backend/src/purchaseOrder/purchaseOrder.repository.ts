import { IRepository } from "../shared/base.repository.js";
import { orm } from "../shared/db/orm.js";
import { PurchaseOrder } from "./purchaseOrder.entity.js";

export class PurchaseOrderRepository implements IRepository<PurchaseOrder> {
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

    public async update(id: number, input: PurchaseOrder): Promise<PurchaseOrder | undefined> {
        const found = await orm.em.findOne(PurchaseOrder, { id });
        if (!found) {
            return undefined;
        }
        orm.em.assign(found, input);
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
}