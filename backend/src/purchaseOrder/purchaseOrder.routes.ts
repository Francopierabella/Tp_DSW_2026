import { Router } from "express";
import { findAll, findOne, create, update, remove } from "./purchaseOrder.controller.js";
import { sanitizedPurchaseOrderInput } from "./purchaseOrder.validations.js";

export const purchaseOrderRouter = Router();

purchaseOrderRouter.get("/", findAll);
purchaseOrderRouter.get("/:id", findOne);
purchaseOrderRouter.post("/", sanitizedPurchaseOrderInput, create);
purchaseOrderRouter.put("/:id", sanitizedPurchaseOrderInput, update);
purchaseOrderRouter.delete("/:id", remove);