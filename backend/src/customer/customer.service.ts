
import { IRepository } from "../shared/base.repository.js";
import { Customer } from "./customer.entity.js";

export class CustomerService {
    constructor(private repo: IRepository<Customer>) { } // Esto es lo de inyeccion de dependencias.
    async findAll(): Promise<Customer[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(id: number): Promise<Customer | undefined> {
        return await this.repo.findOne({ id });
    }
    async create(input: Omit<Customer, "id">): Promise<Customer | undefined> {
        const customer = new Customer(
            input.firstName,
            input.lastName,
            input.phoneNumber,
            input.address,
            input.e_mail,
            input.password,
            input.healthInsurance
        );
        return await this.repo.add(customer);
    }
    async update(id: number, input: Customer): Promise<Customer | undefined> {
        return await this.repo.update(id, input);
    }
    async remove(id: number): Promise<Customer | undefined> {
        return await this.repo.delete({ id });
    }
}