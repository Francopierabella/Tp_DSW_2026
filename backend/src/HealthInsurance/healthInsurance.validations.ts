import { NextFunction, Request, Response } from "express";

export const SanitizedHealthInsuranceInput = (req: Request, res: Response, next: NextFunction) => {
    let { name, coveragePercentage } = req.body;
    if (!name || name.trim() === "") {
        return res.status(400).send({ message: "Name is required" });
    }
    if (!coveragePercentage || typeof coveragePercentage !== "number" || coveragePercentage < 0 || coveragePercentage > 100) {
        return res.status(400).send({ message: "coveragePercentage is required and must be a number between 0 and 100" });
    };

    req.body.sanitizedHealthInsuranceInput = {
        name: name.trim(),
        coveragePercentage
    };
    next();
};
