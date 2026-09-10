import { Request, Response, NextFunction } from "express";

export const sanitizedSaleItemInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { quantity, unitPrice, sale, product } = req.body;

    if (typeof quantity !== "number" || quantity <= 0) {
        return res.status(400).send({
            message: "The quantity must be a number greater than 0"
        });
    }

    if (typeof unitPrice !== "number" || unitPrice < 0) {
        return res.status(400).send({
            message: "The unit price must be a number greater than 0"
        });
    }

    if (typeof sale !== "number" || sale <= 0) {
        return res.status(400).send({
            message: "The sale ID is not valid"
        });
    }

    if (typeof product !== "number" || product <= 0) {
        return res.status(400).send({
            message: "The product ID is not valid"
        });
    }

    req.body.sanitizedSaleItemInput = {
        quantity,
        unitPrice,
        sale,
        product
    };

    next();
};