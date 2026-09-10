import { Collection, Entity, OneToMany, Property } from "@mikro-orm/core";
import { User } from "../user/user.entity.js";
import { Sale } from "../sale/sale.entity.js";

@Entity()
export class Manager extends User {
    @Property({ nullable: false })
    firstName!: string
    @Property({ nullable: false })
    lastName!: string
    @OneToMany(() => Sale, sale => sale.manager)
    sales = new Collection<Sale>(this);

    constructor(firstName: string, lastName: string, e_mail: string, password: string) {
        super(e_mail, password);
        this.firstName = firstName;
        this.lastName = lastName;
    }
}