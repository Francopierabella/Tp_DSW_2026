import { Router } from "express";
import { findAll, findOne, create, update, confirm, cancel, remove } from "./sale.controller.js";
import { sanitizedSaleInput, sanitizedSaleUpdateInput } from "./sale.validations.js";
import { authorizeRole, authenticateToken } from "../middleware/auth.middleware.js";
export const saleRouter = Router();

saleRouter.get("/", authenticateToken, authorizeRole("CUSTOMER", "MANAGER"), findAll);
saleRouter.get("/:id", authenticateToken, authorizeRole("CUSTOMER", "MANAGER"), findOne);
saleRouter.post("/", authenticateToken, authorizeRole("CUSTOMER"), sanitizedSaleInput, create);
saleRouter.patch("/:id", authenticateToken, sanitizedSaleUpdateInput, update);
saleRouter.patch("/:id/confirm", authenticateToken, authorizeRole("MANAGER"), confirm);
saleRouter.patch("/:id/cancel", authenticateToken, authorizeRole("MANAGER"), cancel)
saleRouter.delete("/:id", authenticateToken, authorizeRole("MANAGER"), remove);
