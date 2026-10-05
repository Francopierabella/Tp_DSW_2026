import { Router } from "express";
import { findAll, findOne, create, update, remove } from "./saleItem.controller.js";
import { sanitizedSaleItemInput } from "./saleItem.validations.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";

export const saleItemRouter = Router();

saleItemRouter.get("/", authenticateToken, authorizeRole("MANAGER"), findAll);
saleItemRouter.get("/:id", authenticateToken, authorizeRole("MANAGER"), findOne);
saleItemRouter.post("/", sanitizedSaleItemInput, create);
saleItemRouter.put("/:id", sanitizedSaleItemInput, update);
saleItemRouter.delete("/:id", remove);