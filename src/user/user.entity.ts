import { ObjectId } from "mongodb";

export abstract class User{
    constructor(
        public e_mail : string,
        public password : string,
        public id? : number
    ){}
}