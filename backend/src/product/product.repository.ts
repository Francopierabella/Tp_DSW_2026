
import { IRepository } from '../shared/base.repository.js';
import { Product } from './product.entity.js';
import { orm } from '../shared/db/orm.js';

export class ProductRepository implements IRepository<Product> {
    public async findAll(): Promise<Product[] | undefined> {
        return await orm.em.find(Product, {});
    }
    public async findOne(item: { id: number }): Promise<Product | undefined> {
        const productFinded = await orm.em.findOne(Product, { id: item.id });
        return productFinded ?? undefined;
    }
    public async add(item: Product): Promise<Product | undefined> {
        const productNew = orm.em.create(Product, item);
        await orm.em.persistAndFlush(productNew);
        return productNew;
    }
    public async update(id: number, productInput: Product): Promise<Product | undefined> {
        const productToUpdate = await this.findOne({ id });
        if (!productToUpdate) {
            return undefined;
        }
        orm.em.assign(productToUpdate, productInput);
        await orm.em.flush();
        return productToUpdate;
    }
    public async delete(item: { id: number }): Promise<Product | undefined> {
        const productToDelete = this.findOne({ id: item.id });
        if (!productToDelete) {
            return undefined;
        }
        await orm.em.removeAndFlush(productToDelete);
        return productToDelete;
    }
}
