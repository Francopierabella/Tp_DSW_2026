import { Entity, Property } from "@mikro-orm/core";
import { User } from "../user/user.entity";

Entity()
export class Manager extends User {
    @Property({ nullable: false })
    firstName!: string
    @Property({ nullable: false })
    lastName!: string

    constructor(firstName: string, lastName: string, e_mail: string, password: string) {
        super(e_mail, password);
        this.firstName = firstName;
        this.lastName = lastName;
    }
}