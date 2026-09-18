import { NextFunction, Request, Response } from "express";

export const sanitizedLoginInput = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const { e_mail, password } = req.body;

    if (!e_mail || e_mail.trim() === "") {
        return res.status(400).send({ message: "Email is required" });
    }

    if (!password || password.trim() === "") {
        return res.status(400).send({ message: "Password is required" });
    }

    req.body.sanitizedLoginInput = { e_mail: e_mail.trim(), password: password.trim() };

    next();
};