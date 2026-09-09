import { IRepository } from "../shared/base.repository.js";
import { Manager } from "./manager.entity.js";
import { orm } from "../shared/db/orm.js";

export class ManagerRepository implements IRepository<Manager> {
    public async findAll(): Promise<Manager[] | undefined> {
        return await orm.em.find(Manager, {});
    }
    public async findOne(item: { id: number; }): Promise<Manager | undefined> {
        const found = await orm.em.findOne(Manager, { id: item.id });
        return found ?? undefined;
    }
    public async add(item: Manager): Promise<Manager | undefined> {
        try {
            const created = orm.em.create(Manager, item);
            await orm.em.persistAndFlush(created);
            return created;
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("A Manager with that e-mail already exists.");
            }
            throw error;
        }
    }
    public async update(id: number, input: Manager): Promise<Manager | undefined> {
        const found = await this.findOne({ id });
        if (!found) {
            return undefined;
        }
        orm.em.assign(found, input);
        await orm.em.flush();
        return found;
    }
    public async delete(item: { id: number; }): Promise<Manager | undefined> {
        const found = await this.findOne({ id: item.id });
        if (!found) {
            return undefined;
        }
        await orm.em.removeAndFlush(found);
        return found;
    }
}