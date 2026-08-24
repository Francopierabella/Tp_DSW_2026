import { NextFunction, Request, Response } from "express";

export const sanitizedProductCategoryInput = (req: Request,res: Response,next: NextFunction) => {
    const name = req.body.name;
    // Validamos que el nombre exista y no esté vacío
    if (!name || name.trim() === "") {
        return res.status(400).send({
            message: "El nombre de la categoría no puede estar vacío"
        });
    }
    req.body.sanitizedProductCategoryInput = {
        name: name.trim(),
    };

    Object.keys(req.body.sanitizedProductCategoryInput).forEach((key) => {
        if (req.body.sanitizedProductCategoryInput[key] === undefined) {
            delete req.body.sanitizedProductCategoryInput[key];
        }
    });

    next();
};