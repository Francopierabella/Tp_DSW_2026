import { Collection, Entity, Enum, ManyToOne, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Customer } from "../customer/customer.entity.js";
import { SaleItem } from "../saleItem/saleItem.entity.js";
import { Manager } from "../manager/manager.entity.js";

export enum typesPayment {
    CASH = 'CASH',
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    TRANSFER = 'TRANSFER',
    OTHER = 'OTHER'
}
export enum typesStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED'
}

@Entity()
export class Sale extends BaseEntity {
    @Property({ nullable: false })
    date!: Date

    @Property({ nullable: false })
    totalAmount!: number

    @Enum(() => typesPayment)
    paymentMethod!: typesPayment;

    @Enum(() => typesStatus)
    status!: typesStatus;

    @ManyToOne(() => Customer)
    customer!: number

    @ManyToOne(() => Manager)
    manager!: number

    @OneToMany(() => SaleItem, saleItem => saleItem.sale)
    saleItems = new Collection<SaleItem>(this)

    constructor(date: Date, paymentMethod: typesPayment, status: typesStatus, totalAmount: number, customer: number, manager: number) {
        super()
        this.date = date
        this.paymentMethod = paymentMethod
        this.status = status
        this.totalAmount = totalAmount
        this.customer = customer
        this.manager = manager
    }
}