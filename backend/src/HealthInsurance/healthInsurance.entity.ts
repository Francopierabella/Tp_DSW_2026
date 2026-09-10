import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Customer } from "../customer/customer.entity.js";

@Entity()
export class HealthInsurance extends BaseEntity {
    @Property({ nullable: false, unique: true })
    name!: string;

    @Property({ nullable: false })
    coveragePercentage!: number

    @OneToMany(() => Customer, customer => customer.healthInsurance)
    customers = new Collection<Customer>(this);

    constructor(name: string, coveragePercentage: number) {
        super();
        this.name = name;
        this.coveragePercentage = coveragePercentage;
    }
}