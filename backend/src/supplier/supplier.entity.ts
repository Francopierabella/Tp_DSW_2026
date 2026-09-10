import { Entity, Property, OneToMany, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { PurchaseOrder } from "../purchaseOrder/purchaseOrder.entity.js";

@Entity()
export class Supplier extends BaseEntity {
    @Property({ nullable: false })
    name!: string;

    @Property({ nullable: true })
    phoneNumber?: string;

    @Property({ nullable: false, unique: true })
    e_mail!: string;

    @OneToMany(() => PurchaseOrder, purchaseOrder => purchaseOrder.supplier)
    purchaseOrders = new Collection<PurchaseOrder>(this)

    constructor(name: string, e_mail: string, phoneNumber?: string) {
        super();
        this.name = name;
        this.e_mail = e_mail;
        this.phoneNumber = phoneNumber;
    }
}