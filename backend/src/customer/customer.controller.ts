import { Request, Response } from "express";
import { CustomerService } from "./customer.service.js";
import { CustomerRepository } from "./customer.repository.js";
import { AppError } from "../shared/appError.js";
const service = new CustomerService(new CustomerRepository);

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}

export async function findOne(req: Request, res: Response) {
    const customerId = Number(req.params.id);
    const customerFound = await service.findOne(customerId);
    if (!customerFound) {
        throw new AppError(`Customer with id ${customerId} not found`, 404);
    }
    return res.json(customerFound);
}

export async function findByDni(req: Request, res: Response) {
    const dni = req.params.dni as string;
    const found = await service.findByDni(dni);
    if (!found) {
        throw new AppError(`Customer with dni ${dni} not found`, 404);
    }
    return res.json(found);
}

export async function findByEmail(req: Request, res: Response) {
    const email = req.params.email as string;
    const found = await service.findByEmail(email);
    if (!found) {
        throw new AppError(`Customer with email ${email} not found`, 404);
    }
    return res.json(found);
}

export async function create(req: Request, res: Response) {
    try {

        const customerData = req.body.sanitizedCustomerInput;
        const customerToCreate = await service.create(customerData);
        return res.status(201).json(customerToCreate);
    } catch (error: any) {
        console.error("Error al crear el cliente:", error);
        if (error.message.includes("already exists")) {
            throw new AppError(error.message, 409);
        }
        throw new AppError("Internal server error", 500);
    }
}

export async function update(req: Request, res: Response) {
    const customerIdToUpdate = Number(req.params.id);
    const customerData = req.body.sanitizedCustomerInput;
    const customerWithThisId = await service.update(customerIdToUpdate, customerData);
    if (!customerWithThisId) {
        throw new AppError(`Customer with id ${customerIdToUpdate} not found`, 404);
    }
    return res.json({ "message": "Customer updated successfully", customerWithThisId });
}

export async function remove(req: Request, res: Response) {
    const idToRemove = Number(req.params.id);
    const customerRemoved = await service.remove(idToRemove);
    if (!customerRemoved) {
        throw new AppError(`Customer with id ${idToRemove} not found`, 404);
    }
    return res.json({ message: `Customer, with id ${customerRemoved.id}, named: ${customerRemoved.firstName} ${customerRemoved.lastName}, successfully deleted` });
}