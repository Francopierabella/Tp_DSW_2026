import { Router } from "express";
import { create, findAll, findOne, update, remove, findByDni, findByEmail } from "./customer.controller.js";
import { sanitizedCustomerInput, sanitizedCustomerUpdateInput } from "./customer.validations.js";

export const customerRouter = Router();

customerRouter.get("/", findAll)
customerRouter.get("/:id", findOne)
customerRouter.get("/dni/:dni", findByDni)
customerRouter.get("/email/:email", findByEmail)
customerRouter.post("/", sanitizedCustomerInput, create)
customerRouter.patch("/:id", sanitizedCustomerUpdateInput, update)
customerRouter.delete("/:id", remove)