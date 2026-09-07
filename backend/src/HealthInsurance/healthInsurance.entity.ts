import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";

@Entity()
export class HealthInsurance extends BaseEntity {
    @Property({ nullable: false, unique: true })
    name!: string;

    @Property({ nullable: false })
    coverageAmount: number

    constructor(name: string, coverageAmount: number) {
        super();
        this.name = name;
        this.coverageAmount = coverageAmount;
    }
}