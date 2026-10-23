import { IRepository } from "../shared/base.repository.js";
import { Sale } from "./sale.entity.js";



export interface ISaleRepository extends IRepository<Sale> {
    findByCustomer(customerId: number): Promise<Sale[] | undefined>
    confirm(id: number, managerId: number): Promise<Sale | undefined>
}