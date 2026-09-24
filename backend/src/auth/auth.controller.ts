import { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { CustomerRepository } from "../customer/customer.repository.js";

const service = new AuthService(new CustomerRepository());

export async function login(req: Request, res: Response) {
    try {
        const { e_mail, password } = req.body.sanitizedLoginInput;
        const customer = await service.login(e_mail, password);
        // Extraemos la contraseña para no enviarla en la respuesta
        // y guardamos el resto de los datos del cliente.
        const { password: _, ...customerWithoutPassword } = customer;
        // guarda la password en una const llamda "_"
        return res.json({ message: "Login successful", customer: customerWithoutPassword });

    } catch (error: any) {
        
        if (error.message === "Invalid email or password") {
            return res.status(401).send({
                message: error.message
            });
        }

        return res.status(500).send({
            message: "Internal server error"
        });
    }
}