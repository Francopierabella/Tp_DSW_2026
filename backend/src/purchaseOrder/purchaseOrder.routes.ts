import { Router } from "express";
import { findAll, findOne, create, update, remove, receive } from "./purchaseOrder.controller.js";
import { sanitizedPurchaseOrderInput, sanitizedPurchaseOrderUpdate } from "./purchaseOrder.validations.js";

export const purchaseOrderRouter = Router();

purchaseOrderRouter.get("/", findAll);
purchaseOrderRouter.get("/:id", findOne);
purchaseOrderRouter.post("/", sanitizedPurchaseOrderInput, create);
purchaseOrderRouter.put("/:id", sanitizedPurchaseOrderUpdate, update);
purchaseOrderRouter.delete("/:id", remove);
purchaseOrderRouter.patch("/:id/receive", receive);