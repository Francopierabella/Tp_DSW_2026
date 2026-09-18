import { Request, Response } from "express";
import { SaleService } from "./sale.service.js";
import { SaleRepository } from "./sale.repository.js";
import { SaleItemRepository } from "../saleItem/saleItem.repository.js";
import { AppError } from "../shared/appError.js";

const service = new SaleService(new SaleRepository(), new SaleItemRepository());

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}
export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const saleFound = await service.findOne(id);
    if (!saleFound) {
        throw new AppError(`Sale with id ${id} not found`, 404);
    }
    return res.json(saleFound);
}
export async function create(req: Request, res: Response) {
    try {
        const data = req.body.sanitizedSaleInput;
        const saleCreated = await service.create(data);
        return res.status(201).json(saleCreated);
    }
    catch (error: any) {
        if (error.message === "A customer or manager id is invalid") {
            throw new AppError(error.message, 400);
        }
        throw new AppError("Internal server error", 500);
    }
}
export async function update(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const data = req.body.sanitizedSaleInput
        const saleToUpdate = await service.update(id, data);
        if (!saleToUpdate) {
            throw new AppError(`Sale with id ${id} not found`, 404);
        }
        return res.status(200).json(saleToUpdate);
    }
    catch (error: any) {
        if (error.message === "The customer or manager ID entered is invalid") {
            throw new AppError(error.message, 409);
        }
        throw new AppError("Internal server error", 500);
    }
}
export async function confirm(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const saleConfirmed = await service.confirm(id);
        if (!saleConfirmed) {
            throw new AppError(`Sale with id ${id} not found`, 404);
        }
        return res.status(200).json(saleConfirmed);
    } catch (error: any) {
        if (error.message === "Only pending sales can be confirmed" || error.message === "Cannot confirm a sale with no items") {
            throw new AppError(error.message, 409);
        }
        throw new AppError("Internal server error", 500);
    }
}
export async function cancel(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const saleCancelled = await service.cancel(id);
        if (!saleCancelled) {
            throw new AppError(`Sale with id ${id} not found`, 404);
        }
        return res.status(200).json(saleCancelled);
    } catch (error: any) {
        if (error.message === "Only pending sales can be cancelled") {
            throw new AppError(error.message, 409);
        }
        throw new AppError("Internal server error", 500);
    }
}
export async function remove(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const saleRemoved = await service.remove(id);
        if (!saleRemoved) {
            throw new AppError(`Sale with id ${id} not found`, 404);
        }
        return res.status(200).json(saleRemoved);
    } catch (error: any) {
        if (error.message === "Confirmed sales cannot be deleted") {
            throw new AppError(error.message, 409);
        }
        throw new AppError("Internal server error", 500);
    }
}   