import { ProductHealthInsurance } from "./productHealthInsurance.entity.js";
import { IRepository } from "../shared/base.repository.js";

export interface IProductHealthInsurance extends IRepository<ProductHealthInsurance> {
    findByProductAndHealthInsurance(product: number, healthInsurance: number): Promise<ProductHealthInsurance | undefined>
    findByProduct(product: number): Promise<ProductHealthInsurance[] | undefined>
    findByHealthInsurance(healthInsurance: number): Promise<ProductHealthInsurance[] | undefined>
}