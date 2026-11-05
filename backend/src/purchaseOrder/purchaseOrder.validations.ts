import { Request, Response, NextFunction } from "express";
import { PurchaseOrderStatus } from "./purchaseOrder.entity.js";

export const sanitizedPurchaseOrderInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { date, status, totalAmount, manager, supplier } = req.body;

    if (!date) {
        return res.status(400).send({
            message: "Date is required"
        });
    }

    const purchaseOrderDate = new Date(date);

    if (isNaN(purchaseOrderDate.getTime())) {
        return res.status(400).send({
            message: "Invalid date"
        });
    }

    if (!Object.values(PurchaseOrderStatus).includes(status)) {
        return res.status(400).send({
            message: "Invalid status"
        });
    }

    if (typeof manager !== "number" || manager <= 0) {
        return res.status(400).send({
            message: "Invalid manager ID"
        });
    }
    if (!supplier) {
        return res.status(400).send({
            message: "Supplier ID is required",
        });
    }

    if (typeof supplier !== 'number' || supplier <= 0) {
        return res.status(400).send({
            message: 'Invalid supplier ID. Must be a positive number.',
        });
    }


    // Guardamos únicamente los datos validados y preparados
    req.body.sanitizedPurchaseOrderInput = {
        date: purchaseOrderDate,
        status,
        totalAmount,
        manager,
        supplier
    };

    next();
};

export const sanitizedPurchaseOrderUpdate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { date, status, totalAmount, manager } = req.body;

    if (
        date === undefined &&
        status === undefined &&
        totalAmount === undefined &&
        manager === undefined
    ) {
        return res.status(400).send({
            message: "At least one field is required"
        });
    }

    const sanitizedInput: any = {};

    if (date !== undefined) {
        const purchaseOrderDate = new Date(date);

        if (isNaN(purchaseOrderDate.getTime())) {
            return res.status(400).send({
                message: "Invalid date"
            });
        }

        sanitizedInput.date = purchaseOrderDate;
    }

    if (status !== undefined) {
        if (!Object.values(PurchaseOrderStatus).includes(status)) {
            return res.status(400).send({
                message: "Invalid status"
            });
        }

        sanitizedInput.status = status;
    }

    if (totalAmount !== undefined) {
        if (typeof totalAmount !== "number" || totalAmount < 0) {
            return res.status(400).send({
                message: "Invalid total amount"
            });
        }

        sanitizedInput.totalAmount = totalAmount;
    }

    if (manager !== undefined) {
        if (typeof manager !== "number" || manager <= 0) {
            return res.status(400).send({
                message: "Invalid manager ID"
            });
        }

        sanitizedInput.manager = manager;
    }

    req.body.sanitizedPurchaseOrderInput = sanitizedInput;

    next();
};
export const sanitizedPurchaseOrdersInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).send({
            message: "At least one purchase order item is required"
        });
    }

    for (const item of items) {
        if (
            typeof item.supplierProduct !== "number" ||
            !Number.isInteger(item.supplierProduct) ||
            item.supplierProduct <= 0
        ) {
            return res.status(400).send({
                message: "Invalid supplier product ID"
            });
        }

        if (
            !Number.isInteger(item.quantity) ||
            item.quantity <= 0
        ) {
            return res.status(400).send({
                message: "Invalid quantity"
            });
        }
    }

    req.body.sanitizedPurchaseOrdersInput = {
        items: items.map((item: any) => ({
            supplierProduct: item.supplierProduct,
            quantity: item.quantity
        }))
    };

    next();
};