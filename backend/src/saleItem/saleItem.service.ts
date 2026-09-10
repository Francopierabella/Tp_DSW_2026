
import { IRepository } from "../shared/base.repository.js";
import { SaleItem } from "./saleItem.entity.js";

export class SaleItemService {
    constructor(private readonly repo: IRepository<SaleItem>) { };
    async findAll(): Promise<SaleItem[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(id: number): Promise<SaleItem | undefined> {
        return await this.repo.findOne({ id });
    }
    async create(input: SaleItem): Promise<SaleItem | undefined> {
        const newSaleItem = new SaleItem(
            input.quantity,
            input.unitPrice,
            input.product,
            input.sale,
        )
        return await this.repo.add(newSaleItem);
    }
    async update(id: number, input: SaleItem): Promise<SaleItem | undefined> {
        return await this.repo.update(id, input);
    }

    async remove(id: number): Promise<SaleItem | undefined> {
        return await this.repo.delete({ id });
    }
}