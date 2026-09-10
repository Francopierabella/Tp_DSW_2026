import { Router } from "express";
import { findAll, findOne, create, update, remove } from "./saleItem.controller.js";
import { sanitizedSaleItemInput } from "./saleItem.validations.js";

export const saleItemRouter = Router();

saleItemRouter.get("/", findAll);
saleItemRouter.get("/:id", findOne);
saleItemRouter.post("/", sanitizedSaleItemInput, create);
saleItemRouter.put("/:id", sanitizedSaleItemInput, update);
saleItemRouter.delete("/:id", remove);