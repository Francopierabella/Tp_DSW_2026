
import { HealthInsurance } from "../HealthInsurance/healthInsurance.entity.js";
import { User } from "../user/user.entity.js"
import { Entity, ManyToOne, Property } from "@mikro-orm/core";

@Entity()
export class Customer extends User {
    @Property({ nullable: false })
    firstName!: string;
    @Property({ nullable: false })
    lastName!: string
    @Property({ nullable: false, unique: true })
    phoneNumber!: string;
    @Property({ nullable: false })
    address!: string;
    @ManyToOne(() => HealthInsurance)
    healthInsurance?: number;

    constructor(
        firstName: string,
        lastName: string,
        phoneNumber: string,
        address: string,
        e_mail: string,
        password: string,
        healthInsurance?: number,
    ) {
        super(e_mail, password);
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.healthInsurance = healthInsurance;
    }
}