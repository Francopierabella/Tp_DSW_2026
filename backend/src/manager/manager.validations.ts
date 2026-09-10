import { NextFunction, Request, Response } from "express";

export const sanitizedManagerInput = (req: Request, res: Response, next: NextFunction) => {
    const {
        firstName,
        lastName,
        e_mail,
        password
    } = req.body;
    if (!firstName || firstName.trim() === "") {
        return res.status(400).send({
            message: "First name is required"
        });
    }
    if (!lastName || lastName.trim() === "") {
        return res.status(400).send({
            message: "Last name is required"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

    if (!e_mail || e_mail.trim() === "") {
        return res.status(400).send({
            message: "Email is required"
        });
    }
    if (!emailRegex.test(e_mail)) {
        return res.status(400).send({
            message: "Email is invalid"
        });
    }
    if (!password || password.trim() === "") {
        return res.status(400).send({
            message: "Password is required"
        });
    }
    if (!passwordRegex.test(password)) {
        return res.status(400).send({
            message: "Password must be at least 8 characters long and contain at least one uppercase letter and one number."
        });
    }
    req.body.sanitizedManagerInput = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        e_mail: e_mail.trim(),
        password: password.trim()
    };
    next();
}