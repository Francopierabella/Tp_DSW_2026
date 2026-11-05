import { NextFunction, Request, Response } from "express";

export const sanitizedHealthInsuranceInput = (req: Request, res: Response, next: NextFunction) => {
    let { name } = req.body;
    if (!name || name.trim() === "") {
        return res.status(400).send({ message: "Name is required" });
    }
    req.body.sanitizedHealthInsuranceInput = {
        name: name.trim(),
    };
    next();
};
