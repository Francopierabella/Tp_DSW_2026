import { Request, Response } from "express";
import { SupplierService } from "./supplier.service.js";
import { SupplierRepository } from "./supplier.repository.js";
import { AppError } from "../shared/appError.js";

const service = new SupplierService(new SupplierRepository());

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}

export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const found = await service.findOne(id);
    if (!found) {
        throw new AppError(`Supplier with id ${id} not found`, 404);
    }
    return res.json(found);
}

export async function create(req: Request, res: Response) {
    const data = req.body.sanitizedSupplierInput;
    try {
        const created = await service.create(data);
        return res.status(201).json(created);
    } catch (error: any) {
        if (error.message === "A supplier with that name already exists") {
            throw new AppError(error.message, 409);
        }
        throw new AppError("Internal server error", 500);
    }
}

export async function update(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const data = req.body.sanitizedSupplierInput;
        const updated = await service.update(id, data);
        if (!updated) {
            throw new AppError(`Supplier with id ${id} not found`, 404);
        }
        return res.status(200).json(updated);
    } catch (error: any) {
        if (error.message === "A supplier with that name already exists") {
            throw new AppError(error.message, 409);
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const removed = await service.remove(id);
        if (!removed) {
            throw new AppError(`Supplier with id ${id} not found`, 404);
        }
        return res.status(200).json(removed);
    } catch (error: any) {
        if (error.message === "A supplier with that name already exists") {
            throw new AppError(error.message, 409);
        }
        throw new AppError("Internal server error", 500);
    }
}