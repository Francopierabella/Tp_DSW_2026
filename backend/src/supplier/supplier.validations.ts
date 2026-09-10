import { Request, Response, NextFunction } from "express";

export const sanitizedSupplierInput = (req: Request, res: Response, next: NextFunction) => {
    const { name, e_mail, phoneNumber } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name) {
        return res.status(400).send({ message: "Name is required" })
    }

    if (!emailRegex.test(e_mail)) {
        return res.status(400).send({ message: "Invalid email address" })
    }
    if (!phoneNumber || phoneNumber.trim() === "") {
        return res.status(400).send({ message: "Phone number is required" });
    }

    req.body.sanitizedSupplierInput = {
        name,
        e_mail,
        phoneNumber
    };

    next();
}

