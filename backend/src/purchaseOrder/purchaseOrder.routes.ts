import { Router } from "express";
import { findAll, findOne, create, update, remove, receive, cancel, createMultiple } from "./purchaseOrder.controller.js";
import { authorizeRole, authenticateToken } from "../middleware/auth.middleware.js";
import { sanitizedPurchaseOrderInput, sanitizedPurchaseOrderUpdate, sanitizedPurchaseOrdersInput } from "./purchaseOrder.validations.js";

export const purchaseOrderRouter = Router();

purchaseOrderRouter.get("/", authenticateToken, authorizeRole("MANAGER"), findAll);
purchaseOrderRouter.post("/", authenticateToken, authorizeRole("MANAGER"), sanitizedPurchaseOrderInput, create);
purchaseOrderRouter.post("/confirm", authenticateToken, authorizeRole("MANAGER"), sanitizedPurchaseOrdersInput, createMultiple);
purchaseOrderRouter.get("/:id", authenticateToken, authorizeRole("MANAGER"), findOne);
purchaseOrderRouter.put("/:id", authenticateToken, authorizeRole("MANAGER"), sanitizedPurchaseOrderUpdate, update);
purchaseOrderRouter.delete("/:id", authenticateToken, authorizeRole("MANAGER"), remove);
purchaseOrderRouter.patch("/:id/receive", authenticateToken, authorizeRole("MANAGER"), receive);
purchaseOrderRouter.patch("/:id/cancel", authenticateToken, authorizeRole("MANAGER"), cancel);