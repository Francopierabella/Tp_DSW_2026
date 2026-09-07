import { HealthInsuranceService } from "./healthInsurance.service.js";
import { HealthInsuranceRepository } from "./healthInsurance.repository.js";
import { Request, Response } from "express";

const service = new HealthInsuranceService(new HealthInsuranceRepository);

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}

export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const healthInsuranceWithThisId = await service.findOne(id);
    if (!healthInsuranceWithThisId) {
        return res.status(400).send({ message: "HealthInsurance not found." });
    }
    return res.json(healthInsuranceWithThisId);
}
export async function create(req: Request, res: Response) {
    try {
        const healthInsuranceData = req.body.sanitizedHealthInsuranceInput;
        const newHealthInsurance = await service.create(healthInsuranceData);
        return res.status(201).json(newHealthInsurance);
    } catch (error: any) {
        if (error.message === "A health insurance with that name already exists.") {
            return res.status(409).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}

export async function update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const healthInsuranceData = req.body.sanitizedHealthInsuranceInput;
    const healthInsuranceWithThisId = await service.update(id, healthInsuranceData);
    if (!healthInsuranceWithThisId) {
        return res.status(404).send({ message: "HealthInsurance not found" });
    }
    return res.json(healthInsuranceWithThisId);
}
export async function remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const healthInsuranceWithThisId = await service.remove(id);
    if (!healthInsuranceWithThisId) {
        return res.status(404).send({ message: "HealthInsurance not found" });
    }
    return res.json({ message: `HealthInsurance, with id ${healthInsuranceWithThisId.id} and name: ${healthInsuranceWithThisId.name} , successfully deleted` });
}