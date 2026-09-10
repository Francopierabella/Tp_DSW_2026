import { IRepository } from "../shared/base.repository.js";
import { Supplier } from "./supplier.entity.js";

export class SupplierService {
    constructor(private readonly repo: IRepository<Supplier>) { }

    async findAll(): Promise<Supplier[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(id: number): Promise<Supplier | undefined> {
        return await this.repo.findOne({ id });
    }
    async create(input: Omit<Supplier, "id">): Promise<Supplier | undefined> {
        const supplier = new Supplier(
            input.name,
            input.e_mail,
            input.phoneNumber
        );
        try {
            return await this.repo.add(supplier);
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("A supplier with that e-mail already exists.");
            }
            throw error;
        }
    }
    async update(id: number, input: Supplier): Promise<Supplier | undefined> {
        return await this.repo.update(id, input);
    }
    async remove(id: number): Promise<Supplier | undefined> {
        return await this.repo.delete({ id });
    }
}