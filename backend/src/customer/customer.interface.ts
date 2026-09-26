import { IRepository } from "../shared/base.repository.js";
import { Customer } from "./customer.entity.js";

// Interfaz de customer que extiende el repo base 
// para poder implementar los metodos que no estan en el repo base digamos.

export interface ICustomerRepository extends IRepository<Customer> {
    findByEmail(email: string): Promise<Customer | undefined>;
    findByDni(dni: string): Promise<Customer | undefined>;
}