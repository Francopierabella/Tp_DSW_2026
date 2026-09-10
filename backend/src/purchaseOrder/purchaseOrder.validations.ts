import { Request, Response, NextFunction } from "express";
import { PurchaseOrderStatus } from "./purchaseOrder.entity.js";

export const sanitizedPurchaseOrderInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { date, status, totalAmount, supplier } = req.body;

    // Validamos que la fecha exista y sea válida
    if (!date) {
        return res.status(400).send({
            message: "La fecha de la orden de compra es obligatoria"
        });
    }

    const purchaseOrderDate = new Date(date);

    if (isNaN(purchaseOrderDate.getTime())) {
        return res.status(400).send({
            message: "La fecha ingresada no es válida"
        });
    }

    // Validamos que el estado pertenezca al enum PurchaseOrderStatus
    if (!Object.values(PurchaseOrderStatus).includes(status)) {
        return res.status(400).send({
            message: "El estado de la orden de compra no es válido"
        });
    }

    // Validamos el monto total
    if (typeof totalAmount !== "number" || totalAmount < 0) {
        return res.status(400).send({
            message: "El monto total no es válido"
        });
    }

    // Validamos que el ID del proveedor sea válido
    if (typeof supplier !== "number" || supplier <= 0) {
        return res.status(400).send({
            message: "El ID del proveedor no es válido"
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