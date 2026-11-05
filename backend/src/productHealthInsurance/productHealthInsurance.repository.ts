import { ProductHealthInsurance } from "./productHealthInsurance.entity.js";
import { orm } from "../shared/db/orm.js";
import { IProductHealthInsurance } from "./productHealthInsurance.interface.js";




export class ProductHealthInsuranceRepository implements IProductHealthInsurance {
    public async findAll(): Promise<ProductHealthInsurance[] | undefined> {
        return await orm.em.find(ProductHealthInsurance, {});
    }
    public async findOne(item: { id: number; }): Promise<ProductHealthInsurance | undefined> {
        const found = await orm.em.findOne(ProductHealthInsurance, { id: item.id });
        return found ?? undefined;
    }
    public async findByProductAndHealthInsurance(product: number, healtInsurance: number): Promise<ProductHealthInsurance | undefined> {
        const found = await orm.em.findOne(ProductHealthInsurance, { product: product, healthInsurance: healtInsurance });
        return found ?? undefined;
    }
    public async findByHealthInsurance(healthInsurance: number): Promise<ProductHealthInsurance[] | undefined> {
        const found = await orm.em.find(ProductHealthInsurance, { healthInsurance: healthInsurance });
        return found ?? undefined;
    }
    public async findByProduct(product: number): Promise<ProductHealthInsurance[] | undefined> {
        const found = await orm.em.find(ProductHealthInsurance, { product: product });
        return found ?? undefined;
    }
    public async add(item: ProductHealthInsurance): Promise<ProductHealthInsurance | undefined> {
        const newPHI = orm.em.create(ProductHealthInsurance, item);
        await orm.em.persistAndFlush(newPHI);
        return newPHI;
    }
    public async update(id: number, input: ProductHealthInsurance): Promise<ProductHealthInsurance | undefined> {
        const found = await orm.em.findOne(ProductHealthInsurance, { id });
        if (!found) return undefined;
        orm.em.assign(found, input);
        await orm.em.flush();
        return found;
    }
    public async delete(item: { id: number }): Promise<ProductHealthInsurance | undefined> {
        const found = await orm.em.findOne(ProductHealthInsurance, { id: item.id });
        if (!found) return undefined;
        await orm.em.removeAndFlush(found);
        return found;
    }
}