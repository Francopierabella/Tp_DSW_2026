import { Entity, ManyToOne, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Supplier } from "../supplier/supplier.entity.js";
import { Product } from "../product/product.entity.js";

@Entity()
@Unique({ properties: ["product", "supplier"] })
export class SupplierProduct extends BaseEntity {

    @ManyToOne(() => Product)
    product!: number;

    @ManyToOne(() => Supplier)
    supplier!: number;

    @Property({ nullable: false })
    price!: number;

    constructor(product: number, supplier: number, price: number) {
        super();
        this.product = product;
        this.supplier = supplier;
        this.price = price;
    }
}