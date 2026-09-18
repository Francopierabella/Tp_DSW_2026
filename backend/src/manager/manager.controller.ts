import { Request, Response } from "express";
import { ManagerService } from "./manager.service.js";
import { ManagerRepository } from "./manager.repository.js";
import { AppError } from "../shared/appError.js";

const service = new ManagerService(new ManagerRepository);

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}
export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const found = await service.findOne(id);
    if (!found) {
        throw new AppError(`Manager with id ${id} not found`, 404);
    }
    return res.json(found);
}
export async function create(req: Request, res: Response) {
    try {
        const managerData = req.body.sanitizedManagerInput;
        const newManager = await service.create(managerData);
        return res.status(201).json({ message: "Manager Created", data: newManager });
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            throw new AppError(error.message, 409);
        }
        throw new AppError("Internal server error", 500);
    }
}
export async function update(req: Request, res: Response) {
    try {
        const idToUpdate = Number(req.params.id);
        const managerData = req.body.sanitizedManagerInput;
        const updatedManager = await service.update(idToUpdate, managerData);
        return res.json({ message: "Manager updated successgully", updatedManager });
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            throw new AppError(error.message, 409);
        }
        throw new AppError("Internal server error", 500);
    }
}
export async function remove(req: Request, res: Response) {
    try {
        const idToRemove = Number(req.params.id);
        const managerRemoved = await service.remove(idToRemove);
        return res.json({ message: "Manager deleted successfully", managerRemoved });
    } catch (error: any) {
        if (error.message === "Manager not found") {
            throw new AppError(error.message, 404);
        }
        throw new AppError("Internal server error", 500);
    }
}