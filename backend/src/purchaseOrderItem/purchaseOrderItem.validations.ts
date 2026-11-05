import { Request, Response, NextFunction } from "express";

export const sanitizedPurchaseOrderItemInput = (req: Request, res: Response, next: NextFunction) => {
    const { quantity, purchaseOrder, supplierProduct } = req.body;
    if (!quantity || !purchaseOrder || !supplierProduct) {
        return res.status(400).send({ message: "All fields are required" });
    }
    if (typeof quantity !== "number" || quantity <= 0) {
        return res.status(400).send({ message: "Quantity must be a positive number" });
    }
    if (typeof purchaseOrder !== "number" || purchaseOrder <= 0) {
        return res.status(400).send({ message: "invalid purchaseOrderId" });
    }
    if (typeof supplierProduct !== "number" || supplierProduct <= 0) {
        return res.status(400).send({ message: "invalid supplierProductId" });
    }
    req.body.sanitizedPurchaseOrderItemInput = {
        quantity,
        purchaseOrder,
        supplierProduct
    };
    next();
}