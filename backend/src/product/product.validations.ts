import { NextFunction, Request, Response } from "express";

export const sanitizedProductInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const {
        name,
        description,
        stock,
        price,
        brand,
        gender,
        isFeatured,
        category,
        hasCoverage
    } = req.body;

    if (!name || name.trim() === "") {
        return res.status(400).send({
            message: "Name is required"
        });
    }

    if (!description || description.trim() === "") {
        return res.status(400).send({
            message: "Description is required"
        });
    }

    if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
        return res.status(400).send({
            message: "Stock must be a positive number or zero"
        });
    }

    if (price !== undefined && (typeof price !== "number" || price < 0)) {
        return res.status(400).send({
            message: "Price must be a positive number or zero"
        });
    }

    if (gender !== "Male" && gender !== "Female") {
        return res.status(400).send({
            message: "Gender must be Male or Female"
        });
    }
    if (!category || typeof category !== "number") {
        return res.status(400).send({
            message: "Category is required"
        });
    }
    if (
        hasCoverage !== undefined &&
        typeof hasCoverage !== "boolean"
    ) {
        return res.status(400).send({
            message: "hasCoverage must be a boolean"
        });
    }

    req.body.sanitizedProductInput = {
        name: name.trim(),
        description: description.trim(),
        stock,
        price,
        brand: brand.trim(),
        gender,
        isFeatured,
        category,
        hasCoverage
    };

    next();
};

export const sanitizedUpdateProductInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const {
        name,
        description,
        stock,
        price,
        brand,
        gender,
        isFeatured,
        category,
        hasCoverage
    } = req.body;

    if (name && name.trim() === "") {
        return res.status(400).send({
            message: "Name is required"
        });
    }

    if (description && description.trim() === "") {
        return res.status(400).send({
            message: "Description is required"
        });
    }

    if (stock !== undefined && (typeof stock !== "number" || stock < 0)) {
        return res.status(400).send({
            message: "Stock must be a positive number or zero"
        });
    }

    if (price !== undefined && (typeof price !== "number" || price < 0)) {
        return res.status(400).send({
            message: "Price must be a positive number or zero"
        });
    }

    if (gender && gender !== "Male" && gender !== "Female") {
        return res.status(400).send({
            message: "Gender must be Male or Female"
        });
    }

    if (category && typeof category !== "number") {
        return res.status(400).send({
            message: "Category must be a number"
        });
    }

    if (hasCoverage && typeof hasCoverage !== "boolean") {
        return res.status(400).send({
            message: "hasCoverage must be a boolean"
        });
    }

    //Evita que se agreguen propiedades con valor undefined o false al objeto sanitizado.
    // Solo se incluirán aquellas claves cuyos datos hayan sido proporcionados.
    req.body.sanitizedProductInput = {
        ...(name && { name: name.trim() }),
        ...(description && { description: description.trim() }),
        ...(stock !== undefined && { stock }),
        ...(price !== undefined && { price }),
        ...(brand && { brand: brand.trim() }),
        ...(gender && { gender }),
        ...(isFeatured !== undefined && { isFeatured }),
        ...(category && { category }),
        ...(hasCoverage !== undefined && { hasCoverage })
    };

    next();
};