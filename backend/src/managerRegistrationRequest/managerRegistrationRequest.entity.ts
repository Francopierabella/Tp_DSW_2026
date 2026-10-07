import { Entity, Enum, Property } from "@mikro-orm/core";
import { BaseEntity } from "../shared/baseEntity.entity.js";

export enum ManagerRegistrationRequestStatus {
    Pending = "pending",
    Approved = "approved",
    Rejected = "rejected"
}

@Entity()
export class ManagerRegistrationRequest extends BaseEntity {

    @Property({ nullable: false })
    firstName!: string;

    @Property({ nullable: false })
    lastName!: string;

    @Property({ nullable: false, unique: true })
    e_mail!: string;

    @Property({ nullable: false })
    password!: string;

    @Enum({
        items: () => ManagerRegistrationRequestStatus,
        nullable: false
    })
    status!: ManagerRegistrationRequestStatus;

    @Property({ nullable: false, unique: true })
    token!: string;

    @Property({ nullable: false })
    createdAt!: Date;

    constructor(
        firstName: string,
        lastName: string,
        e_mail: string,
        password: string,
        token: string
    ) {
        super();

        this.firstName = firstName;
        this.lastName = lastName;
        this.e_mail = e_mail;
        this.password = password;
        this.status = ManagerRegistrationRequestStatus.Pending;
        this.token = token;
        this.createdAt = new Date();
    }
}