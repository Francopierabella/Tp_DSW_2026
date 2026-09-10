import { IRepository } from "../shared/base.repository.js";
import { Sale, typesStatus } from "./sale.entity.js";


// el SaleService es el encargado de decidir qué se puede hacer según el estado de la venta.
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
        if (sale.status !== typesStatus.PENDING) {
            throw new Error("Only pending sales can be modified");
        } else {
            sale.date = input.date;
            sale.paymentMethod = input.paymentMethod;
            sale.status = input.status;
            sale.customer = input.customer;
            sale.manager = input.manager;
        }
        return await this.repo.update(id, sale);
    }

    async confirm(id: number): Promise<Sale | undefined> {

        const sale = await this.repo.findOne({ id });

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

        return await this.repo.update(id, sale);
    }

    async cancel(id: number): Promise<Sale | undefined> {
        const sale = await this.repo.findOne({ id });
        if (!sale) {
            return undefined;
        }
        if (sale.status !== typesStatus.PENDING) {
            throw new Error("Only pending sales can be cancelled");
        }
        sale.status = typesStatus.CANCELLED;
        return await this.repo.update(id, sale);
    }

    async remove(id: number): Promise<Sale | undefined> {
        const sale = await this.repo.findOne({ id });
        if (!sale) {
            return undefined;
        }
        if (sale.status === typesStatus.CONFIRMED) {
            throw new Error("Confirmed sales cannot be deleted");
        }
        return await this.repo.delete({ id });
    }

}