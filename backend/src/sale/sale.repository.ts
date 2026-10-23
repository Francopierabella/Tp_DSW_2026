import { Manager } from "../manager/manager.entity.js";
import { IRepository } from "../shared/base.repository.js";
import { orm } from "../shared/db/orm.js";
import { Sale, typesStatus } from "./sale.entity.js";
import { ISaleRepository } from "./sale.interface.js";

export class SaleRepository implements ISaleRepository {
    public async findAll(): Promise<Sale[] | undefined> {
        return await orm.em.find(Sale, {}, {
            populate: ["customer", "saleItems", "saleItems.product"]
        });
    }
    public async findOne(item: { id: number }): Promise<Sale | undefined> {
        const found = await orm.em.findOne(Sale, { id: item.id }, {
            populate: ["customer", "saleItems", "saleItems.product"]
        });

        return found ?? undefined;
    }
    public async add(item: Sale): Promise<Sale | undefined> {
        try {
            const created = orm.em.create(Sale, item);
            await orm.em.persistAndFlush(created);
            return created;
        } catch (error: any) {
            if (error.code === "ER_NO_REFERENCED_ROW_2") {
                throw new Error("The customer ID entered is invalid");
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
        if (input.totalAmount !== undefined) {
            found.totalAmount = input.totalAmount;
        }
        if (input.deliveryMethod !== undefined) {
            found.deliveryMethod = input.deliveryMethod;
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

    public async findByCustomer(customerId: number): Promise<Sale[] | undefined> {
        const found = await orm.em.find(Sale, { customer: customerId });
        return found ?? undefined;
    }
    public async confirm(id: number): Promise<Sale | undefined> {
        const sale = await orm.em.findOne(Sale, { id });

        if (!sale) {
            return undefined;
        }

        if (sale.status !== typesStatus.PENDING) {
            throw new Error("Only pending sales can be confirmed");
        }

        if (sale.totalAmount === 0) {
            throw new Error("Cannot confirm a sale with no items");
        }

        sale.status = typesStatus.CONFIRMED;
        sale.paidDate = new Date();

        await orm.em.flush();

        return sale;
    }
}