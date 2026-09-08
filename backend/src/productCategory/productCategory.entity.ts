import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Product } from "../product/product.entity.js";

// @Entity() => Esta clase representa una tabla 
@Entity()
export class ProductCategory extends BaseEntity {
    // ! => Atributo obligatorio
    @Property({ nullable: false, unique: true })
    name!: string;

    @OneToMany(() => Product, product => product.categoryId)
    // Colección de productos asociados a esta categoría.
    // `this` indica que esta categoría es la entidad propietaria de la colección.
    products = new Collection<Product>(this);

    constructor(name: string) {
        super();
        this.name = name;
    }
}

