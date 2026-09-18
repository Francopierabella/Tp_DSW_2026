import { Router } from "express";
import { sanitizedLoginInput } from "./auth.validations.js";
import { login } from "./auth.controller.js";

export const authRouter = Router();

authRouter.post("/login", sanitizedLoginInput, login);

