import { User } from "../user/user.entity.js"

export class Customer extends User{
    constructor(
        public name : string,
        public lastName : string,
        public phone :string,
        public address :string,
        public healthInsuranceId : string,
        e_mail: string,
        password : string,
        id? : number
        )
        {
            super(e_mail,password,id);
        }
}