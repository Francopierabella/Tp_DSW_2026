import { Request, Response } from "express";
import { ProductHealthInsuranceService } from "./productHealthInsurance.service.js";
import { ProductHealthInsuranceRepository } from "./productHealthInsurance.repository.js";
import { ProductRepository } from "../product/product.repository.js";
import { HealthInsuranceRepository } from "../healthInsurance/healthInsurance.repository.js";
import { AppError } from "../shared/appError.js";

const service = new ProductHealthInsuranceService(new ProductHealthInsuranceRepository(), new ProductRepository(), new HealthInsuranceRepository());

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}
export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        throw new AppError("Invalid ID", 400);
    }
    const found = await service.findOne(id);
    if (!found) {
        throw new AppError("Not found", 404);
    }
    return res.json(found);
}
export async function findByProduct(req: Request, res: Response) {
    const productId = Number(req.params.product);
    if (isNaN(productId)) {
        throw new AppError("Invalid product ID", 400);
    }
    const productsHealthInsurances = await service.findByProduct(productId);
    return res.json(productsHealthInsurances);

}
export async function findByHealthInsurance(req: Request, res: Response) {
    const healthInsuranceId = Number(req.params.healthInsurance);
    if (isNaN(healthInsuranceId)) {
        throw new AppError("Invalid health insurance ID", 400);
    }
    const productsHealthInsurances = await service.findByHealthInsurance(healthInsuranceId);
    return res.json(productsHealthInsurances);
}
export async function findByProductAndHealthInsurance(req: Request, res: Response) {
    const productId = Number(req.params.product);
    const healthInsuranceId = Number(req.params.healthInsurance);
    if (isNaN(productId) || isNaN(healthInsuranceId)) {
        throw new AppError("Invalid product or health insurance ID", 400);
    }
    const productsHealthInsurances = await service.findByProductAndHealthInsurance(productId, healthInsuranceId);
    return res.json(productsHealthInsurances);


}
export async function create(req: Request, res: Response) {
    try {
        const created = await service.create(req.body.sanitizedProductHealthInsuranceInput);
        return res.status(201).json(created);
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
}
export async function update(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            throw new AppError("Invalid ID", 400);
        }
        const updated = await service.update(id, req.body.sanitizedProductHealthInsuranceUpdateInput);
        if (!updated) {
            throw new AppError("Not found", 404);
        }
        return res.status(200).json(updated);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
}

export async function remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        throw new AppError("Invalid ID", 400);
    }
    const removed = await service.remove(id);
    if (!removed) {
        throw new AppError("Not found", 404);
    }
    return res.json(removed);

}