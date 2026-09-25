import { IRepository } from "../shared/base.repository.js";
import { Customer } from "./customer.entity.js";

export interface ICustomerRepository extends IRepository<Customer> {
    findByEmail(email: string): Promise<Customer | undefined>;
    findByDni(dni: string): Promise<Customer | undefined>;
}