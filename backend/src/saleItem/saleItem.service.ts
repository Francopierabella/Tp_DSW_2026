import { IRepository } from "../shared/base.repository.js";
import { Product } from "../product/product.entity.js";
import { Sale, typesStatus } from "../sale/sale.entity.js";
import { SaleItem } from "./saleItem.entity.js";
import { SaleItemRepository } from "./saleItem.repository.js";

export class SaleItemService {

    constructor(
        private readonly repo: SaleItemRepository,
        private readonly saleRepo: IRepository<Sale>,
        private readonly productRepo: IRepository<Product>
    ) { };

    // ============================ FIND ALL ============================
    async findAll(): Promise<SaleItem[] | undefined> {
        return await this.repo.findAll();
    }

    // ============================ FIND ONE ============================
    async findOne(id: number): Promise<SaleItem | undefined> {
        return await this.repo.findOne({ id });
    }

    // ============================ CREATE ============================
    async create(input: SaleItem): Promise<SaleItem | undefined> {

        const sale = await this.saleRepo.findOne({ id: input.sale });
        if (!sale) {
            throw new Error("The sale ID entered is invalid");
        }
        if (sale.status !== typesStatus.PENDING) {
            throw new Error("Only pending sales can have items added");
        }

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
                console.log("SaleItem Created, Updating total")
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

    // ============================ UPDATE ============================    
    async update(id: number, input: Partial<SaleItem>): Promise<SaleItem | undefined> {

        const saleItemFound = await this.repo.findOne({ id });
        if (!saleItemFound) {
            throw new Error("The sale item ID entered is invalid");
        }
        const sale = await this.saleRepo.findOne({ id: saleItemFound.sale });
        if (!sale) {
            throw new Error("The sale ID entered is invalid");
        }
        if (sale.status !== typesStatus.PENDING) {
            throw new Error("Only pending sales can modify items");
        }

        const updated = await this.repo.update(id, input);

        if (updated) {
            console.log("ENTRO AL Updated");
            await this.updateSaleTotal(updated.sale);
        }

        return updated;
    }

    // ============================ REMOVE ============================    
    async remove(id: number): Promise<SaleItem | undefined> {
        const saleItemFound = await this.repo.findOne({ id });
        if (!saleItemFound) {
            throw new Error("The sale item ID entered is invalid");
        }
        const sale = await this.saleRepo.findOne({ id: saleItemFound.sale });
        if (!sale) {
            throw new Error("The sale ID entered is invalid");
        }
        if (sale.status !== typesStatus.PENDING) {
            throw new Error("Only pending sales can remove items");
        }
        const deleted = await this.repo.delete({ id });
        if (deleted) {
            await this.updateSaleTotal(deleted.sale);
        }
        return deleted;
    }

    // ============================ UPDATE SALE TOTAL ============================        
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