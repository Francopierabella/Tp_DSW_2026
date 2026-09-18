import { Request, Response } from "express";
import { PurchaseOrderItemService } from "./purchaseOrderItem.service.js";
import { PurchaseOrderItemRepository } from "./purchaseOrderItem.repository.js";
import { PurchaseOrderRepository } from "../purchaseOrder/purchaseOrder.repository.js";
import { ProductRepository } from "../product/product.repository.js";
import { AppError } from "../shared/appError.js";

const service = new PurchaseOrderItemService
    (new PurchaseOrderItemRepository(),
        new PurchaseOrderRepository(),
        new ProductRepository());

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}
export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const found = await service.findOne(id);
    if (!found) {
        throw new AppError(`Purchase Order Item with id ${id} not found`, 404);
    }
    return res.json(found);
}
export async function create(req: Request, res: Response) {
    try {
        const data = req.body.sanitizedPurchaseOrderItemInput;
        const created = await service.create(data);
        return res.status(201).json(created);
    }
    catch (error: any) {
        if (error.message === "A purchase order with that id does not exist" || error.message === "A product with that id does not exist") {
            throw new AppError(error.message, 400);
        }
        throw new AppError("Internal server error", 500);
    }
}
export async function update(req: Request, res: Response) {
    try {
        console.log("SDAD");
        const id = Number(req.params.id);
        const data = req.body.sanitizedPurchaseOrderItemInput;
        const updated = await service.update(id, data);
        if (!updated) {
            throw new AppError(`Purchase Order Item with id ${id} not found`, 404);
        }
        return res.status(200).json(updated);
    }
    catch (error: any) {
        console.error("ERROR UPDATE PURCHASEORDERITEM:", error);
        if (error.message === "A purchase order item with that id does not exist") {
            throw new AppError(error.message, 404);
        }
        throw new AppError("Internal server error", 500);
    }
}
export async function remove(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const removed = await service.remove(id);
        if (!removed) {
            throw new AppError(`Purchase Order Item with id ${id} not found`, 404);
        }
        return res.status(200).json(removed);
    }
    catch (error: any) {
        throw new AppError("Internal server error", 500);
    }
}