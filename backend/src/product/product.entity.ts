// To be updated


import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { ProductCategory } from "../productCategory/productCategory.entity.js";

@Entity()
export class Product extends BaseEntity {
    @Property({ nullable: false })
    name!: string;
    @Property({ nullable: false })
    description!: string;
    @Property({ nullable: false })
    brand!: string
    @Property({ nullable: false })
    gender!: string
    @Property({ nullable: false })
    price!: number
    @Property({ nullable: false })
    stock!: number
    @Property({ nullable: false })
    isFeatured!: boolean
    @ManyToOne(() => ProductCategory)
    category!: number

    constructor(name: string, description: string, brand: string, gender: string, price: number, stock: number, category: number, isFeatured: boolean = false) {
        super();
        this.name = name;
        this.description = description;
        this.brand = brand;
        this.gender = gender;
        this.price = price;
        this.stock = stock;
        this.isFeatured = isFeatured;
        this.category = category
    }
}