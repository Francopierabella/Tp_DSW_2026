import { Request, Response } from "express";
import { SaleItemService } from "./saleItem.service.js";
import { SaleItemRepository } from "./saleItem.repository.js";
import { ProductRepository } from "../product/product.repository.js";
import { SaleRepository } from "../sale/sale.repository.js";
import { AppError } from "../shared/appError.js";

const service = new SaleItemService(new SaleItemRepository(), new SaleRepository(), new ProductRepository());

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}
export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const saleItemFound = await service.findOne(id);
    if (!saleItemFound) {
        throw new AppError(`Sale Item with id ${id} not found`, 404);
    }
    return res.json(saleItemFound);
}
export async function create(req: Request, res: Response) {
    try {
        const data = req.body.sanitizedSaleItemInput;
        const saleItemCreated = await service.create(data);
        return res.status(201).json(saleItemCreated);
    }
    catch (error: any) {
        if (error.message === "A sale item with that name already exists") {
            throw new AppError(error.message, 409);
        }
        throw new AppError("Internal server error", 500);
    }
}
export async function update(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const data = req.body.sanitizedSaleItemInput
        const saleItemToUpdate = await service.update(id, data);
        if (!saleItemToUpdate) {
            throw new AppError(`Sale Item with id ${id} not found`, 404);
        }
        return res.status(200).json(saleItemToUpdate);
    }
    catch (error: any) {
        throw new AppError("Internal server error", 500);
    }
}
export async function remove(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const saleItemRemoved = await service.remove(id);
        if (!saleItemRemoved) {
            throw new AppError(`Sale Item with id ${id} not found`, 404);
        }
        return res.status(200).json(saleItemRemoved);
    }
    catch (error: any) {
        throw new AppError("Internal server error", 500);
    }
}