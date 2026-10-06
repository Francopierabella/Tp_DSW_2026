import { Router } from "express";
import { findAll, findOne, create, update, remove } from "./supplier.controller.js";
import { sanitizedSupplierInput } from "./supplier.validations.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";

export const supplierRouter = Router();

supplierRouter.get("/", authenticateToken, authorizeRole("MANAGER"), findAll);
supplierRouter.get("/:id", authenticateToken, authorizeRole("MANAGER"), findOne);
supplierRouter.post("/", sanitizedSupplierInput, create);
supplierRouter.put("/:id", sanitizedSupplierInput, update);
supplierRouter.patch("/:id", sanitizedSupplierInput, update);
supplierRouter.delete("/:id", authenticateToken, authorizeRole("MANAGER"), remove);
