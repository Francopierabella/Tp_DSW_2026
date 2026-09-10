import { Router } from "express";
import { findAll, findOne, create, update, remove } from "./supplier.controller.js";
import { sanitizedSupplierInput } from "./supplier.validations.js";

export const supplierRouter = Router();

supplierRouter.get("/", findAll);
supplierRouter.get("/:id", findOne);
supplierRouter.post("/", sanitizedSupplierInput, create);
supplierRouter.put("/:id", sanitizedSupplierInput, update);
supplierRouter.patch("/:id", sanitizedSupplierInput, update);
supplierRouter.delete("/:id", remove);
