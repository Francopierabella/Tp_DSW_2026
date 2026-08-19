
import { IRepository } from "../shared/base.repository.js";
import { ProductCategory } from "./productCategory.entity.js";
import {orm} from "../shared/db/orm.js";

//Repository habla con mikroOrm y la bd


export class ProductCategoryRepository implements IRepository<ProductCategory> {
    public async findAll(): Promise<ProductCategory[] | undefined> {
        return await orm.em.find(ProductCategory,{});
        // => Buscame todas las entidades ProductCategory 
        // es lo mismo que "SELECT * FROM product_category"
        // Orm relaciona ProductCategory con la tabla product_category ya de por si.
        // Es decir, (EntityName) -> (TebleName) = entity_name
    }
    public async findOne(item: { id: number; }): Promise<ProductCategory | undefined> {
        const productCategory = await orm.em.findOne(ProductCategory,{id:item.id});
        return productCategory ?? undefined;

        // lo mismo a SELECT * FROM p... where id =  item.id
    }

    public async add(item: ProductCategory): Promise<ProductCategory | undefined> {
        const productCategory = orm.em.create(ProductCategory,item);
        // => Crea una instancia manejada por MikroORM
        await orm.em.persistAndFlush(productCategory);
        // persist => "quiero guardar esta entidad"
        // flush => MikroORM ejecuta los cambios pendientes en la base de datos
        return productCategory;
    }
    public async update(id: number, productCategoryInput: ProductCategory): Promise<ProductCategory | undefined> {
        const productCategoryToUpdate = await this.findOne({id});
        if(!productCategoryToUpdate){
            return undefined;
        }
        productCategoryToUpdate.name = productCategoryInput.name;
        await orm.em.flush();
        return productCategoryToUpdate;
    }
    public async delete(item: { id: number; }): Promise<ProductCategory | undefined> {
        const productCategoryToDelete = await this.findOne(item);
        if(!productCategoryToDelete){
            return undefined;
        }
        await orm.em.removeAndFlush(productCategoryToDelete);
    
        return productCategoryToDelete;
    }
}