import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";

@Entity()
export class HealthInsurance extends BaseEntity {
    @Property({ nullable: false, unique: true })
    name!: string;

    @Property({ nullable: false })
    coveragePercentage: number

    constructor(name: string, coveragePercentage: number) {
        super();
        this.name = name;
        this.coveragePercentage = coveragePercentage;
    }
}