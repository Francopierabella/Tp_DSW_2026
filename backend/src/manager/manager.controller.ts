import { Request, Response } from "express";
import { ManagerService } from "./manager.service.js";
import { ManagerRepository } from "./manager.repository.js";

const service = new ManagerService(new ManagerRepository);

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}
export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const found = await service.findOne(id);
    if (!found) {
        return res.status(404).send({ message: "Manager not found" });
    }
    return res.json(found);
}
export async function create(req: Request, res: Response) {
    try {
        const managerData = req.body.sanitizedManagerInput;
        const newManager = await service.create(managerData);
        return res.status(201).json({ message: "Manager Created", data: newManager });
    } catch (error: any) {
        return res.status(500).json({ message: "Error creating Manager", error: error.message });
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
            return res.status(409).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}
export async function remove(req: Request, res: Response) {
    try {
        const idToRemove = Number(req.params.id);
        const managerRemoved = await service.remove(idToRemove);
        return res.json({ message: "Manager deleted successfully", managerRemoved });
    } catch (error: any) {
        if (error.message === "Manager not found") {
            return res.status(404).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}