import { Router } from "express";
import { findAll, findOne, findByProduct, findBySupplier, findByProductAndSupplier } from "./supplierProduct.controller.js";
import { authorizeRole, authenticateToken } from "../middleware/auth.middleware.js";

export const supplierProductRouter = Router();

supplierProductRouter.get("/", authenticateToken, authorizeRole("MANAGER"), findAll);
supplierProductRouter.get("/supplier/:supplier", authenticateToken, authorizeRole("MANAGER"), findBySupplier);
supplierProductRouter.get("/product/:product", authenticateToken, authorizeRole("MANAGER"), findByProduct);
supplierProductRouter.get("/product/:product/supplier/:supplier", authenticateToken, authorizeRole("MANAGER"), findByProductAndSupplier);
supplierProductRouter.get("/:id", authenticateToken, authorizeRole("MANAGER"), findOne);