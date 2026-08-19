import { BaseEntity } from "../shared/baseEntity.entity.js";
import { Entity, Property } from "@mikro-orm/core";

@Entity()
export abstract class User extends BaseEntity {

    @Property({ nullable: false, unique: true })
    e_mail!: string;

    @Property({ nullable: false })
    password!: string;

    constructor(
        e_mail: string,
        password: string
    ) {
        super();
        this.e_mail = e_mail;
        this.password = password;
    }
}