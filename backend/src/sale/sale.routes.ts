import { Router } from "express";
import { findAll, findOne, create, update, confirm, cancel, remove } from "./sale.controller.js";
import { sanitizedSaleInput, sanitizedSaleUpdateInput } from "./sale.validations.js";

export const saleRouter = Router();

saleRouter.get("/", findAll);
saleRouter.get("/:id", findOne);
saleRouter.post("/", sanitizedSaleInput, create);
saleRouter.patch("/:id", sanitizedSaleUpdateInput, update);
saleRouter.patch("/:id/confirm", confirm);
saleRouter.patch("/:id/cancel", cancel)
saleRouter.delete("/:id", remove);
