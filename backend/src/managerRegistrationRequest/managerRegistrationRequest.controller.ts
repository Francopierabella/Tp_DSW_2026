import { Request, Response } from "express";

import { ManagerRegistrationRequestService } from "./managerRegistrationRequest.service.js";
import { ManagerRegistrationRequestRepository } from "./managerRegistrationRequest.repository.js";
import { ManagerRegistrationRequestStatus } from "./managerRegistrationRequest.entity.js";
import { validateManagerRegistrationRequest } from "./managerRegistrationRequest.validations.js";

const service = new ManagerRegistrationRequestService(
    new ManagerRegistrationRequestRepository()
);

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}

export async function findOne(req: Request, res: Response) {
    const found = await service.findOne(Number(req.params.id));
    return found ? res.json(found) : res.status(404).send();
}

export async function findByToken(req: Request, res: Response) {
    const found = await service.findByToken(req.params.token as string);
    return found ? res.json(found) : res.status(404).send();
}

export async function findByEmail(req: Request, res: Response) {
    const found = await service.findByEmail(req.params.email as string);
    return found ? res.json(found) : res.status(404).send();
}

export async function create(req: Request, res: Response) {
    try {
        const sanitizedInput = validateManagerRegistrationRequest(req.body);
        await service.create(sanitizedInput);
        return res.status(201).send({ message: "Solicitud de registro enviada correctamente" });
    } catch (error: any) {
        return res.status(400).send({ message: error.message });
    }
}

export async function updateStatus(req: Request, res: Response) {
    const { id, status } = req.body;
    const updated = await service.updateStatus(Number(id), status as ManagerRegistrationRequestStatus);
    return updated ? res.json(updated) : res.status(404).send();
}

export async function remove(req: Request, res: Response) {

    const found = await service.findOne(Number(req.params.id));
    if (!found) {
        return res.status(404).send();
    }
    const removed = await service.remove(Number(found.id));
    return removed ? res.json(removed) : res.status(404).send();
}