import { Request, response, Response } from "express";
import { SaleService } from "./sale.service.js";
import { SaleRepository } from "./sale.repository.js";

const service = new SaleService(new SaleRepository());

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}
export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const saleFound = await service.findOne(id);
    if (!saleFound) {
        return res.status(404).send({ message: "Sale not Found" });
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
        console.error("Error create:", error);
        return res.status(500).send({ message: error.message });
    }
}
export async function update(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const data = req.body.sanitizedSaleInput
        const saleToUpdate = await service.update(id, data);
        if (!saleToUpdate) {
            return res.status(404).send({ message: "Sale not Found" });
        }
        return res.status(200).json(saleToUpdate);
    }
    catch (error: any) {
        console.error("ERROR: ", error);
        if (error.message === "A sale with that name already exists") {
            return res.status(404).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}
export async function confirm(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const saleConfirmed = await service.confirm(id);
        if (!saleConfirmed) {
            return res.status(404).send({
                message: "Sale not Found"
            });
        }
        return res.status(200).json(saleConfirmed);
    } catch (error: any) {
        if (error.message === "Only pending sales can be confirmed") {
            return res.status(409).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}
export async function cancel(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const saleCancelled = await service.cancel(id);
        if (!saleCancelled) {
            return res.status(404).send({
                message: "Sale not Found"
            });
        }
        return res.status(200).json(saleCancelled);
    } catch (error: any) {
        if (error.message === "Only pending sales can be cancelled") {
            return res.status(409).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}
export async function remove(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const saleRemoved = await service.remove(id);
        if (!saleRemoved) {
            return res.status(404).send({ message: "Sale not Found" });
        }
        return res.status(200).json(saleRemoved);
    }
    catch (error: any) {
        if (error.message === "A sale with that name already exists") {
            return res.status(404).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}