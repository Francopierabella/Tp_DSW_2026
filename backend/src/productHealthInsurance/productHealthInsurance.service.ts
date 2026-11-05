import { ProductHealthInsuranceRepository } from "./productHealthInsurance.repository.js";
import { ProductHealthInsurance } from "./productHealthInsurance.entity.js";
import { IRepository } from "../shared/base.repository.js";
import { Product } from "../product/product.entity";
import { HealthInsurance } from "../healthInsurance/healthInsurance.entity";

export class ProductHealthInsuranceService {
    constructor(
        private readonly repo: ProductHealthInsuranceRepository,
        private readonly productRepo: IRepository<Product>,
        private readonly healthInsuranceRepo: IRepository<HealthInsurance>
    ) { }
    async findAll(): Promise<ProductHealthInsurance[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(id: number): Promise<ProductHealthInsurance | undefined> {
        return await this.repo.findOne({ id });
    }
    async findByProductAndHealthInsurance(product: number, healthInsurance: number): Promise<ProductHealthInsurance | undefined> {
        return await this.repo.findByProductAndHealthInsurance(product, healthInsurance);
    }
    async findByProduct(product: number): Promise<ProductHealthInsurance[] | undefined> {
        return await this.repo.findByProduct(product);
    }
    async findByHealthInsurance(healthInsurance: number): Promise<ProductHealthInsurance[] | undefined> {
        return await this.repo.findByHealthInsurance(healthInsurance);
    }
    async create(input: ProductHealthInsurance): Promise<ProductHealthInsurance | undefined> {
        const healthInsurance = await this.healthInsuranceRepo.findOne({ id: input.healthInsurance });
        if (!healthInsurance) {
            throw new Error("The Health Insurance ID entered does not exist");
        }

        const product = await this.productRepo.findOne({ id: input.product });
        if (!product) {
            throw new Error("The Product ID entered does not exist");
        }

        const alreadyExists = await this.repo.findByProductAndHealthInsurance(input.product, input.healthInsurance);
        if (alreadyExists) {
            throw new Error("Coverage for this product and health insurance already exists");
        }

        return await this.repo.add(input);
    }
    async update(id: number, input: ProductHealthInsurance): Promise<ProductHealthInsurance | undefined> {
        return this.repo.update(id, input);
    }
    async remove(id: number): Promise<ProductHealthInsurance | undefined> {
        return this.repo.delete({ id });
    }

}