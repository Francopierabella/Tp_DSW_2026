import { Router } from "express";
import { create, remove, update, findAll, findOne } from "./purchaseOrderItem.controller.js";
import { sanitizedPurchaseOrderItemInput } from "./purchaseOrderItem.validations.js";

export const purchaseOrderItemRouter = Router();

purchaseOrderItemRouter.get('/', findAll);
purchaseOrderItemRouter.get('/:id', findOne);
purchaseOrderItemRouter.post('/', sanitizedPurchaseOrderItemInput, create);
purchaseOrderItemRouter.put('/:id', sanitizedPurchaseOrderItemInput, update);
purchaseOrderItemRouter.delete('/:id', remove);
