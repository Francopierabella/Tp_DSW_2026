import { Collection, Entity, Enum, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Customer } from "../customer/customer.entity.js";
import { SaleItem } from "../saleItem/saleItem.entity.js";
import { Manager } from "../manager/manager.entity.js";

export enum typesPayment {
    CASH = 'CASH',
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    TRANSFER = 'TRANSFER'
}
export enum typesStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED'
}
export enum typesDelivery {
    PICKUP = 'PICKUP',
    DELIVERY = 'DELIVERY'
}

@Entity()
export class Sale extends BaseEntity {
    @Property({ nullable: false })
    date!: Date

    @Property({ nullable: true })
    paidDate?: Date

    @Property({ nullable: false })
    totalAmount!: number

    // @Property({nullable: false})
    // shippingCost!: number

    @Enum({ items: () => typesPayment, nullable: false })
    paymentMethod!: typesPayment;

    @Enum({ items: () => typesStatus, nullable: false })
    status!: typesStatus;

    @Enum({ items: () => typesDelivery, nullable: false })
    deliveryMethod!: typesDelivery;

    @ManyToOne(() => Customer)
    customer!: number

    @ManyToOne(() => Manager)
    manager!: number

    @OneToMany(() => SaleItem, saleItem => saleItem.sale)
    saleItems = new Collection<SaleItem>(this)

    constructor(date: Date, paymentMethod: typesPayment, deliveryMethod: typesDelivery, customer: number, manager: number) {
        super()
        this.date = date
        this.paidDate = undefined
        this.status = typesStatus.PENDING
        this.deliveryMethod = deliveryMethod
        this.paymentMethod = paymentMethod
        this.totalAmount = 0
        this.customer = customer
        this.manager = manager
    }
}