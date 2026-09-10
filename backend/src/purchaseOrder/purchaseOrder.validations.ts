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