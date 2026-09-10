import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Sale } from "../sale/sale.entity.js";
import { Product } from "../product/product.entity.js";

@Entity()
export class SaleItem extends BaseEntity {
    @Property({ nullable: false })
    quantity!: number

    @Property({ nullable: false })
    unitPrice!: number

    @ManyToOne(() => Sale)
    sale!: number

    @ManyToOne(() => Product)
    product!: number

    constructor(quantity: number, unitPrice: number, sale: number, product: number) {
        super()
        this.quantity = quantity
        this.unitPrice = unitPrice
        this.sale = sale
        this.product = product
    }
}