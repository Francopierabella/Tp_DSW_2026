import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { PurchaseOrder } from "../purchaseOrder/purchaseOrder.entity.js";
import { SupplierProduct } from "../supplierProduct/supplierProduct.entity.js";
@Entity()
export class PurchaseOrderItem extends BaseEntity {
    @Property({ nullable: false })
    quantity!: number;

    @Property({ nullable: false })
    unitPrice!: number;

    @ManyToOne(() => PurchaseOrder)
    purchaseOrder!: number;

    @ManyToOne(() => SupplierProduct)
    supplierProduct!: number;

    constructor(quantity: number, unitPrice: number, purchaseOrder: number, supplierProduct: number) {
        super();
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.purchaseOrder = purchaseOrder;
        this.supplierProduct = supplierProduct;
    }
}