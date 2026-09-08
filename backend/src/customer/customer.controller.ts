import { Request, Response } from "express";
import { CustomerService } from "./customer.service.js";
import { CustomerRepository } from "./customer.repository.js";

const service = new CustomerService(new CustomerRepository);

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}

export async function findOne(req: Request, res: Response) {
    const customerId = Number(req.params.id);
    const customerFound = await service.findOne(customerId);
    if (!customerFound) {
        return res.status(400).send({ message: "Customer not found" });
    }
    return res.json(customerFound);
}

export async function create(req: Request, res: Response) {
    try {

        const customerData = req.body.sanitizedCustomerInput;
        const customerToCreate = await service.create(customerData);
        return res.status(201).json(customerToCreate);
    } catch (error: any) {
        if (error.message === "A Customer with that e-mail or phone number already exists.") {
            return res.status(409).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}

export async function update(req: Request, res: Response) {
    const customerIdToUpdate = Number(req.params.id);
    const customerData = req.body.sanitizedCustomerInput;
    const customerWithThisId = await service.update(customerIdToUpdate, customerData);
    if (!customerWithThisId) {
        return res.status(400).send({ message: "Customer not found" });
    }
    return res.json({ "message": "Customer updated successfully", customerWithThisId });
}

export async function remove(req: Request, res: Response) {
    const idToRemove = Number(req.params.id);
    const customerRemoved = await service.remove(idToRemove);
    if (!customerRemoved) {
        return res.status(400).send({ message: "Customer not found" });
    }
    return res.json({ message: `Customer, with id ${customerRemoved.id}, named: ${customerRemoved.firstName} ${customerRemoved.lastName}, successfully deleted` });
}