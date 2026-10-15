import { IRepository } from "../shared/base.repository.js";
import { orm } from "../shared/db/orm";
import { Sale } from "./sale.entity.js";



export interface ISaleRepository extends IRepository<Sale> {
    findByCustomer(customerId: number): Promise<Sale[] | undefined>
}