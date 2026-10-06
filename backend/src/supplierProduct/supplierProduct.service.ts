import { SupplierProduct } from "./supplierProduct.entity.js";
import { IRepository } from "../shared/base.repository.js";
import { Supplier } from "../supplier/supplier.entity.js";
import { Product } from "../product/product.entity.js";
import { SupplierProductRepository } from "./supplierProduct.repository.js";

export class SupplierProductService {
    constructor(
        private readonly repo: SupplierProductRepository,
        private readonly productRepo: IRepository<Product>,
        private readonly supplierRepo: IRepository<Supplier>,
    ) { }
    async findAll(): Promise<SupplierProduct[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(id: number): Promise<SupplierProduct | undefined> {
        return await this.repo.findOne({ id });
    }
    async findByProduct(productId: number): Promise<SupplierProduct[]> {
        const product = await this.productRepo.findOne({ id: productId });
        if (!product) {
            throw new Error("The product ID entered is invalid");
        }
        return await this.repo.findByProduct(productId);
    }
    async findBySupplier(supplierId: number): Promise<SupplierProduct[]> {
        const supplier = await this.supplierRepo.findOne({ id: supplierId });
        if (!supplier) {
            throw new Error("The supplier ID entered is invalid");
        }
        return await this.repo.findBySupplier(supplierId);
    }
    async findByProductAndSupplier(productId: number, supplierId: number): Promise<SupplierProduct | undefined> {
        const supplier = await this.supplierRepo.findOne({ id: supplierId });
        if (!supplier) {
            throw new Error("The supplier ID entered is invalid");
        }
        const product = await this.productRepo.findOne({ id: productId });
        if (!product) {
            throw new Error("The product ID entered is invalid");
        }
        return await this.repo.findByProductAndSupplier(productId, supplierId);
    }
}
