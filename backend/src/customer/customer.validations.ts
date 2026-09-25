
import { NextFunction, Request, Response } from "express";


export const sanitizedCustomerInput = (req: Request, res: Response, next: NextFunction) => {
    const {
        firstName,
        lastName,
        dni,
        phoneNumber,
        address,
        e_mail,
        password,
        healthInsurance
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

    if (!dni || dni.trim() === "") {
        return res.status(400).send({
            message: "Dni is required"
        })
    }
    if (dni.length !== 8) {
        return res.status(400).send({
            message: "Dni must be 8 digits long"
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

    if (healthInsurance !== undefined && (typeof healthInsurance !== "number" || healthInsurance <= 0)) {
        return res.status(400).send({ message: "Health insurance is not valid" });
    }

    req.body.sanitizedCustomerInput = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dni: dni.trim(),
        phoneNumber: phoneNumber.trim(),
        address: address.trim(),
        e_mail: e_mail.trim(),
        password: password.trim(),
        healthInsurance
    };

    next();
};
export const sanitizedCustomerUpdateInput = (req: Request, res: Response, next: NextFunction) => {
    const {
        firstName,
        lastName,
        dni,
        phoneNumber,
        address,
        e_mail,
        password,
        healthInsurance
    } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).+$/;

    // Validate only if present
    if (firstName !== undefined && firstName.trim() === "") {
        return res.status(400).send({ message: "First name cannot be empty" });
    }

    if (lastName !== undefined && lastName.trim() === "") {
        return res.status(400).send({ message: "Last name cannot be empty" });
    }

    if (dni !== undefined) {
        if (dni.trim() === "") {
            return res.status(400).send({ message: "Dni cannot be empty" });
        }
        if (dni.length !== 8) {
            return res.status(400).send({ message: "Dni must be 8 digits long" });
        }
    }

    if (phoneNumber !== undefined && phoneNumber.trim() === "") {
        return res.status(400).send({ message: "Phone number cannot be empty" });
    }

    if (address !== undefined && address.trim() === "") {
        return res.status(400).send({ message: "Address cannot be empty" });
    }

    if (e_mail !== undefined) {
        if (e_mail.trim() === "" || !emailRegex.test(e_mail)) {
            return res.status(400).send({ message: "Email is not valid" });
        }
    }

    if (password !== undefined) {
        if (!passwordRegex.test(password)) {
            return res.status(400).send({ message: "Password must contain at least one uppercase letter and one number" });
        }
    }

    if (healthInsurance !== undefined && (typeof healthInsurance !== "number" || healthInsurance <= 0)) {
        return res.status(400).send({ message: "Health insurance is not valid" });
    }

    // Build the sanitized object with ONLY the fields that were provided
    // ... spread operator 
    req.body.sanitizedCustomerInput = {
        ...(firstName && { firstName: firstName.trim() }),
        ...(lastName && { lastName: lastName.trim() }),
        ...(dni && { dni: dni.trim() }),
        ...(phoneNumber && { phoneNumber: phoneNumber.trim() }),
        ...(address && { address: address.trim() }),
        ...(e_mail && { e_mail: e_mail.trim() }),
        ...(password && { password: password.trim() }),
        ...(healthInsurance !== undefined && { healthInsurance })
    };

    next();
};