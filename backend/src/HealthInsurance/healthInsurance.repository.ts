import { HealthInsurance } from "./healthInsurance.entity.js";
import { IRepository } from "../shared/base.repository.js";
import { orm } from "../shared/db/orm.js";

export class HealthInsuranceRepository implements IRepository<HealthInsurance> {
    public async findAll(): Promise<HealthInsurance[] | undefined> {
        return await orm.em.find(HealthInsurance, {});
    }
    public async findOne(item: { id: number }): Promise<HealthInsurance | undefined> {
        const found = await orm.em.findOne(HealthInsurance, { id: item.id });
        return found ?? undefined;
    }
    public async add(item: HealthInsurance): Promise<HealthInsurance | undefined> {
        try {
            const newHealthInsurance = orm.em.create(HealthInsurance, item);
            await orm.em.persistAndFlush(newHealthInsurance);
            // persistAndFlush: create a new entity and save it to the database.
            return newHealthInsurance;
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("A health insurance with that name already exists.");
            }
            throw error;
        }
    }
    public async update(id: number, item: HealthInsurance): Promise<HealthInsurance | undefined> {
        const healthInsuranceToUpdate = await this.findOne({ id });
        if (!healthInsuranceToUpdate) {
            return undefined;
        }
        orm.em.assign(healthInsuranceToUpdate, item);
        await orm.em.flush();
        // Saves the changes made in the entity to the database.
        return healthInsuranceToUpdate;
    }
    public async delete(item: { id: number }): Promise<HealthInsurance | undefined> {
        const healthInsuranceToDelete = await this.findOne({ id: item.id });
        if (!healthInsuranceToDelete) {
            return undefined;
        }
        await orm.em.removeAndFlush(healthInsuranceToDelete);
        // remove the instance and save changes in DB.
        return healthInsuranceToDelete;
    }


}