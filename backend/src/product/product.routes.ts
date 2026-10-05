import { Router } from "express";
import { sanitizedProductInput, sanitizedUpdateProductInput } from "./product.validations.js";
import { create, findAll, findOne, remove, update } from './product.controller.js'
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";


export const productRouter = Router();

productRouter.get("/", findAll);
productRouter.get("/:id", findOne);
productRouter.post("/", authenticateToken, authorizeRole("MANAGER"), sanitizedProductInput, create);
productRouter.patch("/:id", authenticateToken, authorizeRole("MANAGER"), sanitizedUpdateProductInput, update);
productRouter.delete("/:id", authenticateToken, authorizeRole("MANAGER"), remove);
