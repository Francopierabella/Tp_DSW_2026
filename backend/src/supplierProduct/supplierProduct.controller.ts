import { Request, Response } from "express";
import { SupplierProductService } from "./supplierProduct.service.js";
import { SupplierProductRepository } from "./supplierProduct.repository.js";
import { SupplierRepository } from "../supplier/supplier.repository.js";
import { ProductRepository } from "../product/product.repository.js";
import { AppError } from "../shared/appError.js";

const service = new SupplierProductService(new SupplierProductRepository(), new ProductRepository(), new SupplierRepository());

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}
export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const found = await service.findOne(id);
    if (!found) {
        throw new AppError("Not Found", 404);
    }
    return res.json(found);
}
export async function findByProduct(req: Request, res: Response) {
    const productId = Number(req.params.product);
    const found = await service.findByProduct(productId);
    if (!found) {
        throw new AppError("Not Found", 404);
    }
    return res.json(found);

}
export async function findBySupplier(req: Request, res: Response) {
    const supplierId = Number(req.params.supplier);
    const found = await service.findBySupplier(supplierId);
    if (!found) {
        throw new AppError("Not Found", 404);
    }
    return res.json(found);
}
export async function findByProductAndSupplier(req: Request, res: Response) {
    const productId = Number(req.params.product);
    const supplierId = Number(req.params.supplier);
    const found = await service.findByProductAndSupplier(productId, supplierId);
    if (!found) {
        throw new AppError("Not Found", 404);
    }
    return res.json(found);
}

