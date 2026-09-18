import bcrypt from "bcrypt";
import { CustomerRepository } from "../customer/customer.repository.js";

export class AuthService {

    constructor(private customerRepository: CustomerRepository) { }

    async login(e_mail: string, password: string) {

        const customer = await this.customerRepository.findByEmail(e_mail);

        if (!customer) {
            throw new Error("Invalid email or password");
        }

        const passwordMatch = await bcrypt.compare(password, customer.password);

        if (!passwordMatch) {
            throw new Error("Invalid email or password");
        }

        return customer;
    }
}