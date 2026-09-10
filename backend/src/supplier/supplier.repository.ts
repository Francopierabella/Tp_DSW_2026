import { IRepository } from "../shared/base.repository.js";
import { Supplier } from "./supplier.entity.js";
import { orm } from "../shared/db/orm.js";

export class SupplierRepository implements IRepository<Supplier> {
    async findAll(): Promise<Supplier[] | undefined> {
        return await orm.em.find(Supplier, {});
    }
    async findOne(item: { id: number }): Promise<Supplier | undefined> {
        const found = await orm.em.findOne(Supplier, { id: item.id });
        return found ?? undefined;
    }
    async add(item: Supplier): Promise<Supplier | undefined> {
        try {
            const created = orm.em.create(Supplier, item);
            await orm.em.persistAndFlush(created);
            return created;
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("A supplier with that e-mail already exists.");
            }
            throw error;
        }
    }
    async update(id: number, input: Supplier): Promise<Supplier | undefined> {
        const found = await orm.em.findOne(Supplier, { id });
        if (!found) {
            return undefined;
        }
        orm.em.assign(found, input);
        await orm.em.flush();
        return found;
    }
    async delete(item: { id: number }): Promise<Supplier | undefined> {
        const found = await this.findOne({ id: item.id });
        if (!found) {
            return undefined;
        }
        await orm.em.removeAndFlush(found);
        return found;
    }
}