import { Request, Response, NextFunction } from "express";
import { PurchaseOrderStatus } from "./purchaseOrder.entity.js";

export const sanitizedPurchaseOrderInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { date, status, totalAmount, supplier } = req.body;

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

    if (typeof supplier !== "number" || supplier <= 0) {
        return res.status(400).send({
            message: "Invalid supplier ID"
        });
    }

    // Guardamos únicamente los datos validados y preparados
    req.body.sanitizedPurchaseOrderInput = {
        date: purchaseOrderDate,
        status,
        totalAmount,
        supplier
    };

    next();
};

export const sanitizedPurchaseOrderUpdate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { date, status, totalAmount, supplier } = req.body;

    if (
        date === undefined &&
        status === undefined &&
        totalAmount === undefined &&
        supplier === undefined
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

    if (supplier !== undefined) {
        if (typeof supplier !== "number" || supplier <= 0) {
            return res.status(400).send({
                message: "Invalid supplier ID"
            });
        }

        sanitizedInput.supplier = supplier;
    }

    req.body.sanitizedPurchaseOrderInput = sanitizedInput;

    next();
};