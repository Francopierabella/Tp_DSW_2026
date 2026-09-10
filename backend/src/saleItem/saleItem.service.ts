import { IRepository } from "../shared/base.repository.js";
import { Product } from "../product/product.entity.js";
import { Sale } from "../sale/sale.entity.js";
import { SaleItem } from "./saleItem.entity.js";
import { SaleItemRepository } from "./saleItem.repository.js";

export class SaleItemService {

    constructor(
        private readonly repo: SaleItemRepository,
        private readonly saleRepo: IRepository<Sale>,
        private readonly productRepo: IRepository<Product>
    ) { };

    async findAll(): Promise<SaleItem[] | undefined> {
        return await this.repo.findAll();
    }

    async findOne(id: number): Promise<SaleItem | undefined> {
        return await this.repo.findOne({ id });
    }

    async create(input: SaleItem): Promise<SaleItem | undefined> {

        const product = await this.productRepo.findOne({
            id: input.product
        });

        if (!product) {
            throw new Error("The product ID entered is invalid");
        }
        try {
            const newSaleItem = new SaleItem(
                input.quantity,
                product.price,
                input.sale,
                input.product
            );
            const created = await this.repo.add(newSaleItem);
            if (created) {
                await this.updateSaleTotal(input.sale);
            }
            return created;
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("A sale item with that name already exists.");
            }
            throw error;
        }
    }

    async update(id: number, input: Partial<SaleItem>): Promise<SaleItem | undefined> {

        const updated = await this.repo.update(id, input);

        if (updated) {
            await this.updateSaleTotal(updated.sale);
        }

        return updated;
    }

    async remove(id: number): Promise<SaleItem | undefined> {

        const deleted = await this.repo.delete({ id });

        if (deleted) {
            await this.updateSaleTotal(deleted.sale);
        }

        return deleted;
    }

    private async updateSaleTotal(saleId: number): Promise<void> {

        const saleItems = await this.repo.findBySale(saleId);
        let total = 0;
        if (saleItems) {
            for (const item of saleItems) {
                total += item.quantity * item.unitPrice;
            }
        }

        await this.saleRepo.update(saleId, { totalAmount: total });
    }
}