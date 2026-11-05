import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Customer } from "../customer/customer.entity.js";
import { ProductHealthInsurance } from "../productHealthInsurance/productHealthInsurance.entity.js";

@Entity()
export class HealthInsurance extends BaseEntity {
    @Property({ nullable: false, unique: true })
    name!: string;

    @OneToMany(() => Customer, customer => customer.healthInsurance)
    customers = new Collection<Customer>(this);

    @OneToMany(() => ProductHealthInsurance, phi => phi.healthInsurance)
    productHealthInsurances = new Collection<ProductHealthInsurance>(this);

    constructor(name: string) {
        super();
        this.name = name;
    }
}