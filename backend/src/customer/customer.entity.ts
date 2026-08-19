// // To be updated

import { User } from "../user/user.entity.js"
import 
{Entity,Property}
from "@mikro-orm/core";
import {BaseEntity} from "../shared/baseEntity.entity.js";

@Entity()
export class Customer extends User {
    @Property ({nullable:false})
    firstName!:string;
    @Property ({nullable:false})
    lastName!:string
    @Property({nullable:false,unique:true})
    phoneNumber!:string; 
    @Property({nullable:false})
    address!:string;

    constructor(
        firstName:string,
        lastName:string,
        phoneNumber:string,
        address:string,
        e_mail:string,
        password:string,){
            super(e_mail,password);
            this.firstName = firstName;
            this.lastName = lastName;
            this.phoneNumber = phoneNumber;
            this.address = address;
        }
}