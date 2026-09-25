
import { Customer } from "./customer.entity.js";
import bcrypt from "bcrypt";
import { ICustomerRepository } from "./customer.interface.js";

export class CustomerService {
    constructor(private repo: ICustomerRepository) { } // Esto es lo de inyeccion de dependencias.
    async findAll(): Promise<Customer[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(id: number): Promise<Customer | undefined> {
        return await this.repo.findOne({ id });
    }
    async findByDni(dni: string): Promise<Customer | undefined> {
        return await this.repo.findByDni(dni);
    }
    async findByEmail(email: string): Promise<Customer | undefined> {
        return await this.repo.findByEmail(email);
    }
    async create(input: Omit<Customer, "id">): Promise<Customer | undefined> {

        const hashedPassword = await bcrypt.hash(input.password, 10);
        // El hash de contraseñas implica convertir las contraseñas en una cadena alfanumérica usando algoritmos especializados.
        // Hacemos que la contraseña sea ilegible basicamente.

        const customer = new Customer(
            input.firstName,
            input.lastName,
            input.dni,
            input.phoneNumber,
            input.address,
            input.e_mail,
            hashedPassword,
            input.healthInsurance
        );
        return await this.repo.add(customer);
    }
    async update(id: number, input: Customer): Promise<Customer | undefined> {
        return await this.repo.update(id, input);
    }
    async remove(id: number): Promise<Customer | undefined> {
        return await this.repo.delete({ id });
    }
}