
import { HealthInsurance } from "../healthInsurance/healthInsurance.entity.js";
import { User } from "../user/user.entity.js"
import { Entity, ManyToOne, Property } from "@mikro-orm/core";

@Entity()
export class Customer extends User {
    @Property({ nullable: false })
    firstName!: string;
    @Property({ nullable: false })
    lastName!: string
    @Property({ nullable: false, unique: true })
    dni!: string;
    @Property({ nullable: false, unique: true })
    phoneNumber!: string;
    @Property({ nullable: false })
    address!: string;
    @Property({ nullable: false })
    isActive!: boolean;
    @ManyToOne(() => HealthInsurance, { nullable: true })
    healthInsurance?: number;

    constructor(
        firstName: string,
        lastName: string,
        dni: string,
        phoneNumber: string,
        address: string,
        isActive: boolean = true,
        e_mail: string,
        password: string,
        healthInsurance?: number,
    ) {
        super(e_mail, password);
        this.firstName = firstName;
        this.lastName = lastName;
        this.dni = dni;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.isActive = isActive;
        this.healthInsurance = healthInsurance;
    }
}