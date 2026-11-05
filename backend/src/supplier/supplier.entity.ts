import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";

@Entity()
export class Supplier extends BaseEntity {
    @Property({ nullable: false })
    name!: string;

    @Property({ nullable: true })
    phoneNumber?: string;

    @Property({ nullable: false, unique: true })
    e_mail!: string;

    constructor(name: string, e_mail: string, phoneNumber?: string) {
        super();
        this.name = name;
        this.e_mail = e_mail;
        this.phoneNumber = phoneNumber;
    }
}