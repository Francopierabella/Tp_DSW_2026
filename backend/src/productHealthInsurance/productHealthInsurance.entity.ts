import { Entity, ManyToOne, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Product } from "../product/product.entity.js";
import { HealthInsurance } from "../healthInsurance/healthInsurance.entity.js";


@Entity()
@Unique({ properties: ["product", "healthInsurance"] })
export class ProductHealthInsurance extends BaseEntity {
    @ManyToOne(() => Product, { nullable: false })
    product!: number
    @ManyToOne(() => HealthInsurance, { nullable: false })
    healthInsurance!: number
    @Property({ nullable: false })
    coveragePercentage!: number

    constructor(product: number, healthInsurance: number, coveragePercentage: number,) {
        super();
        this.product = product;
        this.healthInsurance = healthInsurance;
        this.coveragePercentage = coveragePercentage;
    }
}