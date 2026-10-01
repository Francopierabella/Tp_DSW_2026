import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomerRepository } from "../customer/customer.repository.js";
import { ManagerRepository } from "../manager/manager.repository.js";

export class AuthService {

    constructor(
        private customerRepository: CustomerRepository,
        private managerRepository: ManagerRepository
    ) { }

    async login(e_mail: string, password: string) {

        const customer = await this.customerRepository.findByEmail(e_mail);

        if (customer) {

            const passwordMatch = await bcrypt.compare(
                password,
                customer.password
            );

            if (!passwordMatch) {
                throw new Error("Invalid email or password");
            }

            const token = this.generateToken(
                customer.id!,
                customer.e_mail,
                "CUSTOMER"
            );

            return {
                user: customer,
                role: "CUSTOMER",
                token
            };
        }

        const manager = await this.managerRepository.findByEmail(e_mail);

        if (manager) {

            const passwordMatch = await bcrypt.compare(
                password,
                manager.password
            );

            if (!passwordMatch) {
                throw new Error("Invalid email or password");
            }

            const token = this.generateToken(
                manager.id!,
                manager.e_mail,
                "MANAGER"
            );

            return {
                user: manager,
                role: "MANAGER",
                token
            };
        }

        throw new Error("Invalid email or password");
    }

    private generateToken(
        userId: number,
        e_mail: string,
        role: "CUSTOMER" | "MANAGER"
    ): string {

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET is not configured");
        }

        return jwt.sign(
            {
                userId,
                e_mail,
                role
            },
            secret,
            {
                expiresIn: "2h"
            }
        );
    }
}