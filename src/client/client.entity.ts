import crypto from "node:crypto"

export class Client {
    constructor(
        public name: string,
        public lastName: string,
        public e_mail: string,
        public password: string,
        public id = crypto.randomUUID())
        {

        }


}