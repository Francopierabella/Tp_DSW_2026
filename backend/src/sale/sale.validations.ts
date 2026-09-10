import { Request, Response, NextFunction } from "express";
import { typesPayment, typesStatus } from "./sale.entity.js";

export const sanitizedSaleInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { date, paymentMethod, status, customer, manager } = req.body;

    if (!date) {
        return res.status(400).send({
            message: "The sale date is required"
        });
    }

    const saleDate = new Date(date);

    if (isNaN(saleDate.getTime())) {
        return res.status(400).send({
            message: "The date entered is invalid"
        });
    }

    if (!Object.values(typesPayment).includes(paymentMethod)) {
        return res.status(400).send({
            message: "The payment method entered is invalid"
        });
    }

    if (typeof customer !== "number" || customer <= 0) {
        return res.status(400).send({
            message: "The customer ID entered is invalid"
        });
    }
    if (typeof manager !== "number" || manager <= 0) {
        return res.status(400).send({
            message: "The manager ID entered is invalid"
        });
    }

    req.body.sanitizedSaleInput = {
        date: saleDate,
        paymentMethod,
        status,
        customer,
        manager
    };

    next();
};