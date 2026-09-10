import { IRepository } from "../shared/base.repository.js";
import { Sale } from "./sale.entity.js";

export class SaleService {

    constructor(private readonly repo: IRepository<Sale>) { };

    async findAll(): Promise<Sale[] | undefined> {
        return await this.repo.findAll();
    }

    async findOne(id: number): Promise<Sale | undefined> {
        return await this.repo.findOne({ id });
    }

    async create(input: Sale): Promise<Sale | undefined> {

        const sale = new Sale(
            input.date,
            input.paymentMethod,
            input.status,
            input.customer,
            input.manager
        );

        return await this.repo.add(sale);
    }

    async update(id: number, input: Sale): Promise<Sale | undefined> {
        const sale = await this.repo.findOne({ id });
        if (!sale) {
            return undefined;
        }
        sale.date = input.date;
        sale.paymentMethod = input.paymentMethod;
        sale.status = input.status;
        sale.customer = input.customer;
        sale.manager = input.manager;
        return await this.repo.update(id, sale);
    }

    async remove(id: number): Promise<Sale | undefined> {
        return await this.repo.delete({ id });
    }

}