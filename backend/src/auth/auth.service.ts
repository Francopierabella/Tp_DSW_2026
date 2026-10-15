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

        // es el metodo que me genera el token
        // cuando un usuario se registra o se logue correctamente.
        // firma el token con un secreto que esta en el archivo .env.


        const secret = process.env.JWT_SECRET;
        // si no esta configurado el secreto, lanzo un error.
        if (!secret) {
            throw new Error("JWT_SECRET is not configured");
        }

        // jwt.sign lleva 3 parametros.
        return jwt.sign(
            // payload: es la informacion que quiero guardar en el token.
            {
                userId,
                e_mail,
                role
            },
            // secret: es la clave privada que solo la conoce el servidor.
            secret,
            // options: es la informacion que quiero guardar en el token.
            {
                expiresIn: "2h"
            }
        );
    }
}