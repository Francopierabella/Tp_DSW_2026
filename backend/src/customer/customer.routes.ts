import { Router } from "express";
import { create, findAll, findOne, update, remove } from "./customer.controller.js";
import { sanitizedCustomerInput } from "./customer.validations.js";

export const customerRouter = Router();

customerRouter.get("/", findAll)
customerRouter.get("/:id", findOne)
customerRouter.post("/", sanitizedCustomerInput, create)
customerRouter.put("/:id", sanitizedCustomerInput, update)
customerRouter.patch("/:id", sanitizedCustomerInput, update)
customerRouter.delete("/:id", remove)