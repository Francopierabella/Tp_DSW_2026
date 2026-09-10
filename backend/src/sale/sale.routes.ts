import { Router } from "express";
import { findAll, findOne, create, update, remove } from "./sale.controller.js";
import { sanitizedSaleInput } from "./sale.validations.js";

export const saleRouter = Router();

saleRouter.get("/", findAll);
saleRouter.get("/:id", findOne);
saleRouter.post("/", sanitizedSaleInput, create);
saleRouter.put("/:id", sanitizedSaleInput, update);
saleRouter.patch("/:id", sanitizedSaleInput, update);
saleRouter.delete("/:id", remove);
