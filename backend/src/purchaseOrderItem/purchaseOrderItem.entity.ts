import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { PurchaseOrder } from "../purchaseOrder/purchaseOrder.entity.js";
import { Product } from "../product/product.entity.js";

@Entity()
export class PurchaseOrderItem extends BaseEntity {
    @Property({ nullable: false })
    quantity!: number;

    @Property({ nullable: false })
    unitPrice!: number;

    @ManyToOne(() => PurchaseOrder)
    purchaseOrder!: number;

    @ManyToOne(() => Product)
    product!: number;

    constructor(quantity: number, unitPrice: number, purchaseOrder: number, product: number) {
        super();
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.purchaseOrder = purchaseOrder;
        this.product = product;
    }
}