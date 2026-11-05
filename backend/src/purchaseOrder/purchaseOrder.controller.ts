import { Request, Response } from "express";
import { PurchaseOrderService } from "./purchaseOrder.service.js";
import { PurchaseOrderRepository } from "./purchaseOrder.repository.js";
import { AppError } from "../shared/appError.js";
import { AuthRequest } from "../middleware/auth.middleware.js";
const service = new PurchaseOrderService(new PurchaseOrderRepository());

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}
export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const found = await service.findOne({ id });
    if (!found) {
        throw new AppError(`Purchase Order with id ${id} not found`, 404);
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
            throw new AppError(error.message, 400);
        }
        throw new AppError("Internal server error", 500);
    }
}
export async function update(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const data = req.body.sanitizedPurchaseOrderInput;
        const updated = await service.update(id, data);
        if (!updated) {
            throw new AppError(`Purchase Order with id ${id} not found`, 404);
        }
        return res.status(200).json(updated);
    }
    catch (error: any) {
        if (error.message === "A supplier with that id does not exist") {
            throw new AppError(error.message, 400);
        }
        throw new AppError("Internal server error", 500);
    }
}
export async function remove(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const removed = await service.remove(id);
        console.log("REMOVED", removed);
        if (!removed) {
            throw new AppError(`Purchase Order with id ${id} not found`, 404);
        }
        return res.status(200).json(removed);
    }
    catch (error: any) {
        console.log(error);
        throw new AppError("Internal server error", 500);
    }
}
export async function receive(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const received = await service.receive(id);
        if (!received) {
            throw new AppError(`Purchase Order with id ${id} not found`, 404);
        }
        return res.status(200).json(received);
    }
    catch (error: any) {
        throw new AppError("Internal server error", 500);
    }
}

export async function cancel(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const cancelled = await service.cancel(id);
        if (!cancelled) throw new AppError(`Purchase Order with id ${id} not found`, 404);
        return res.status(200).json(cancelled);
    } catch (error: any) {
        throw new AppError("internal server error", 500);
    }
}
export async function createMultiple(req: Request, res: Response) {
    try {
        const authReq = req as AuthRequest;

        if (!authReq.user) {
            throw new AppError("Authentication required", 401);
        }

        const data = req.body.sanitizedPurchaseOrdersInput;

        const createdOrders = await service.createMultiple({
            ...data,
            manager: authReq.user.userId
        });

        return res.status(201).json(createdOrders);

    } catch (error: any) {
        console.error(error);

        if (
            error.message === "Invalid purchase order data" ||
            error.message === "Invalid purchase order item" ||
            error.message === "Manager not found" ||
            error.message === "SupplierProduct not found"
        ) {
            throw new AppError(error.message, 400);
        }

        if (error instanceof AppError) {
            throw error;
        }

        throw new AppError("Internal server error", 500);
    }
}