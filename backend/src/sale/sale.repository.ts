import { IRepository } from "../shared/base.repository.js";
import { orm } from "../shared/db/orm.js";
import { Sale } from "./sale.entity.js";

export class SaleRepository implements IRepository<Sale> {
    public async findAll(): Promise<Sale[] | undefined> {
        return await orm.em.find(Sale, {});
    }
    public async findOne(item: { id: number }): Promise<Sale | undefined> {
        const found = await orm.em.findOne(Sale, { id: item.id });
        return found ?? undefined;
    }
    public async add(item: Sale): Promise<Sale | undefined> {
        try {
            const created = orm.em.create(Sale, item);
            await orm.em.persistAndFlush(created);
            return created;
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("A sale with that name already exists.");
            }
            if (error.code === "ER_NO_REFERENCED_ROW_2") {
                throw new Error("The customer or manager ID entered is invalid");
            }
            throw error;
        }
    }
    public async update(id: number, input: Sale): Promise<Sale | undefined> {
        const found = await orm.em.findOne(Sale, { id });
        if (!found) {
            return undefined;
        }
        if (input.date !== undefined) {
            found.date = input.date;
        }
        if (input.paymentMethod !== undefined) {
            found.paymentMethod = input.paymentMethod;
        }
        if (input.status !== undefined) {
            found.status = input.status;
        }
        if (input.customer !== undefined) {
            found.customer = input.customer;
        }
        if (input.manager !== undefined) {
            found.manager = input.manager;
        }
        if (input.totalAmount !== undefined) {
            found.totalAmount = input.totalAmount;
        }
        if (input.paidDate !== undefined) {
            found.paidDate = input.paidDate;
        }
        await orm.em.flush();

        return found;
    }

    public async delete(item: { id: number }): Promise<Sale | undefined> {
        const found = await this.findOne({ id: item.id });
        if (!found) {
            return undefined
        }
        await orm.em.removeAndFlush(found)
        return found;
    }
}