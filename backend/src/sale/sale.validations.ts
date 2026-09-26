import { Request, Response, NextFunction } from "express";
import { typesPayment, typesDelivery } from "./sale.entity.js";

export const sanitizedSaleInput = (req: Request, res: Response, next: NextFunction) => {

    const { date, paymentMethod, deliveryMethod, customer, manager } = req.body;

    const saleDate = date ? new Date(date) : new Date();

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

    if (!Object.values(typesDelivery).includes(deliveryMethod)) {
        return res.status(400).send({
            message: "The delivery method entered is invalid"
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
        deliveryMethod,
        customer,
        manager
    };

    next();
};

export const sanitizedSaleUpdateInput = (req: Request, res: Response, next: NextFunction) => {
    const { paymentMethod, deliveryMethod } = req.body;

    if (paymentMethod && !Object.values(typesPayment).includes(paymentMethod)) {
        return res.status(400).send({
            message: "The payment method entered is invalid"
        });
    }

    if (deliveryMethod && !Object.values(typesDelivery).includes(deliveryMethod)) {
        return res.status(400).send({
            message: "The delivery method entered is invalid"
        });
    }

    req.body.sanitizedSaleUpdateInput = {
        ...(paymentMethod && { paymentMethod }),
        ...(deliveryMethod && { deliveryMethod })
    };

    next();
}