import { Request, Response } from "express";
import { SaleItemService } from "./saleItem.service.js";
import { SaleItemRepository } from "./saleItem.repository.js";

const service = new SaleItemService(new SaleItemRepository());

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}
export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const saleItemFound = await service.findOne(id);
    if (!saleItemFound) {
        return res.status(400).send({ message: "Sale Item not Found" });
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
        return res.status(500).send({ message: error.message });
    }
}
export async function update(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const data = req.body.sanitizedSaleItemInput
        const saleItemToUpdate = await service.update(id, data);
        if (!saleItemToUpdate) {
            return res.status(400).send({ message: "Sale Item not Found" });
        }
        return res.status(200).json(saleItemToUpdate);
    }
    catch (error: any) {
        if (error.message === "A sale item with that name already exists") {
            return res.status(409).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}
export async function remove(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const saleItemRemoved = await service.remove(id);
        if (!saleItemRemoved) {
            return res.status(400).send({ message: "Sale Item not Found" });
        }
        return res.status(200).json(saleItemRemoved);
    }
    catch (error: any) {
        if (error.message === "A sale item with that name already exists") {
            return res.status(409).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}