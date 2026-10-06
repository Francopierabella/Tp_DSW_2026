import { SupplierProduct } from "./supplierProduct.entity.js";
import { orm } from "../shared/db/orm.js";

export class SupplierProductRepository {
    async findAll(): Promise<SupplierProduct[] | undefined> {
        return orm.em.find(SupplierProduct, {});
    }
    async findOne(item: { id: number; }): Promise<SupplierProduct | undefined> {
        const found = await orm.em.findOne(SupplierProduct, { id: item.id });
        return found ?? undefined;
    }
    async findByProduct(productId: number): Promise<SupplierProduct[]> {
        const found = await orm.em.find(SupplierProduct, { product: productId });
        return found;
    }
    async findBySupplier(supplierId: number): Promise<SupplierProduct[]> {
        const found = await orm.em.find(SupplierProduct, { supplier: supplierId });
        return found;
    }
    async findByProductAndSupplier(productId: number, supplierId: number): Promise<SupplierProduct | undefined> {
        const found = await orm.em.findOne(SupplierProduct, { product: productId, supplier: supplierId });
        return found ?? undefined;
    }
}