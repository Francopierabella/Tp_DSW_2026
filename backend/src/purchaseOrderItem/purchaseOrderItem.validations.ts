import { Request, Response, NextFunction } from "express";

export const sanitizedPurchaseOrderItemInput = (req: Request, res: Response, next: NextFunction) => {
    const { quantity, unitPrice, purchaseOrder, product } = req.body;
    if (!quantity || !unitPrice || !purchaseOrder || !product) {
        return res.status(400).send({ message: "All fields are required" });
    }
    if (typeof quantity !== "number" || quantity <= 0) {
        return res.status(400).send({ message: "Quantity must be a positive number" });
    }
    if (typeof unitPrice !== "number" || unitPrice <= 0) {
        return res.status(400).send({ message: "unitPrice must be a positive number" });
    }
    if (typeof purchaseOrder !== "number" || purchaseOrder <= 0) {
        return res.status(400).send({ message: "invalid purchaseOrderId" });
    }
    if (typeof product !== "number" || product <= 0) {
        return res.status(400).send({ message: "invalid productId" });
    }
    req.body.sanitizedPurchaseOrderItemInput = {
        quantity,
        unitPrice,
        purchaseOrder,
        product
    };
    next();
}