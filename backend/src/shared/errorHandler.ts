import { Request, Response, NextFunction } from "express";
import { AppError } from "./appError.js";

//Error Handling: 
// Si el error es una instancia de AppError, lo devolvemos con su statusCode y mensaje
// Si no, devolvemos un error 500 con un mensaje genérico

export function ErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
}