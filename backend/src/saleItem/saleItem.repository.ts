import { IRepository } from "../shared/base.repository.js";
import { SaleItem } from "./saleItem.entity.js";
import { orm } from "../shared/db/orm.js";

export class SaleItemRepository implements IRepository<SaleItem> {
    public async findAll(): Promise<SaleItem[] | undefined> {
        return await orm.em.find(SaleItem, {});
    }
    public async findOne(item: { id: number }): Promise<SaleItem | undefined> {
        const found = await orm.em.findOne(SaleItem, { id: item.id });
        return found ?? undefined;
    }
    public async add(item: SaleItem): Promise<SaleItem | undefined> {
        try {
            const created = orm.em.create(SaleItem, item);
            await orm.em.persistAndFlush(created);
            return created;
        } catch (error: any) {
            throw error;
        }
    }
    public async update(id: number, input: SaleItem): Promise<SaleItem | undefined> {
        const found = await orm.em.findOne(SaleItem, { id });
        if (!found) {
            return undefined;
        }
        orm.em.assign(found, input);
        await orm.em.flush();
        return found;
    }
    public async delete(item: { id: number }): Promise<SaleItem | undefined> {
        const found = await this.findOne({ id: item.id });
        if (!found) {
            return undefined
        }
        await orm.em.removeAndFlush(found)
        return found;
    }
}