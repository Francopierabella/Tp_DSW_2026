
import { NextFunction, Request, Response } from "express";


export const sanitizedCustomerInput = (req: Request, res: Response, next: NextFunction) => {
    const {
        firstName,
        lastName,
        phoneNumber,
        address,
        e_mail,
        password,
        healthInsuranceId
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

    if (!phoneNumber || phoneNumber.trim() === "") {
        return res.status(400).send({
            message: "Phone number is required"
        });
    }

    if (!address || address.trim() === "") {
        return res.status(400).send({
            message: "Address is required"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // sirven para chequear validez
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

    if (!e_mail || e_mail.trim() === "") {
        return res.status(400).send({
            message: "Email is required"
        });
    }

    if (!emailRegex.test(e_mail)) {
        return res.status(400).send({
            message: "Email is not valid"
        });
    }

    if (!password || password.trim() === "") {
        return res.status(400).send({
            message: "Password is required"
        });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).send({
            message: "Password must contain at least one uppercase letter and one number"
        });
    }

    if (
        healthInsuranceId !== undefined &&
        (typeof healthInsuranceId !== "number" || healthInsuranceId <= 0)
    ) {
        return res.status(400).send({
            message: "Health insurance ID is not valid"
        });
    }

    req.body.sanitizedCustomerInput = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phoneNumber: phoneNumber.trim(),
        address: address.trim(),
        e_mail: e_mail.trim(),
        password: password.trim(),
        healthInsuranceId
    };

    next();
};