import { Request, Response } from "express";
import { PurchaseOrderService } from "./purchaseOrder.service.js";
import { PurchaseOrderRepository } from "./purchaseOrder.repository.js";

const service = new PurchaseOrderService(new PurchaseOrderRepository());

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}
export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const found = await service.findOne({ id });
    if (!found) {
        return res.status(404).send({ message: "Purchase Order not found" });
    }
    return res.json(found);
}
export async function create(req: Request, res: Response) {
    try {
        const data = req.body.sanitizedPurchaseOrderInput;
        const created = await service.create(data);
        return res.status(201).json(created);
    }
    catch (error: any) {
        if (error.message === "A supplier with that id does not exist") {
            return res.status(400).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}
export async function update(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const data = req.body.sanitizedPurchaseOrderInput;
        const updated = await service.update(id, data);
        if (!updated) {
            return res.status(404).send({ message: "Purchase Order not found" });
        }
        return res.status(200).json(updated);
    }
    catch (error: any) {
        if (error.message === "A supplier with that id does not exist") {
            return res.status(400).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}
export async function remove(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const removed = await service.remove(id);
        if (!removed) {
            return res.status(404).send({ message: "Purchase Order not found" });
        }
        return res.status(200).json(removed);
    }
    catch (error: any) {
        return res.status(500).send({ message: "Internal server error" });
    }
}