import { IRepository } from "../shared/base.repository.js";
import { Customer } from "./customer.entity.js";
import { orm } from "../shared/db/orm.js";


export class CustomerRepository implements IRepository<Customer> {
    public async findAll(): Promise<Customer[] | undefined> {
        return await orm.em.find(Customer, {});
    }
    public async findOne(item: { id: number }): Promise<Customer | undefined> {
        const found = await orm.em.findOne(Customer, { id: item.id });
        return found ?? undefined;
    }
    public async add(item: Customer): Promise<Customer | undefined> {
        try {
            const newCustomer = orm.em.create(Customer, item);
            await orm.em.persistAndFlush(newCustomer);
            return newCustomer;
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("A Customer with that e-mail or phone number already exists.");
            }
            throw error;
        }
    }
    public async update(id: number, item: Customer): Promise<Customer | undefined> {
        const customerToUpdate = await this.findOne({ id });
        if (!customerToUpdate) {
            return undefined;
        }
        orm.em.assign(customerToUpdate, item);
        await orm.em.flush();
        return customerToUpdate;

    }
    public async delete(item: { id: number }): Promise<Customer | undefined> {
        const customerToDelete = await this.findOne({ id: item.id });
        if (!customerToDelete) {
            return undefined;
        }
        await orm.em.removeAndFlush(customerToDelete);
        return customerToDelete;
    }

}