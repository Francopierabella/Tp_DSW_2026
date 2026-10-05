import { Router } from "express";
import { create, findAll, findOne, update, remove, findByDni, findByEmail } from "./customer.controller.js";
import { sanitizedCustomerInput, sanitizedCustomerUpdateInput } from "./customer.validations.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";
export const customerRouter = Router();

customerRouter.get("/", authenticateToken, authorizeRole("MANAGER"), findAll)
customerRouter.get("/:id", authenticateToken, authorizeRole("MANAGER"), findOne)
customerRouter.get("/dni/:dni", authenticateToken, authorizeRole("MANAGER"), findByDni)
customerRouter.get("/email/:email", authenticateToken, authorizeRole("MANAGER"), findByEmail)
customerRouter.post("/", authenticateToken, sanitizedCustomerInput, create)
customerRouter.patch("/:id", authenticateToken, sanitizedCustomerUpdateInput, update)
customerRouter.delete("/:id", authenticateToken, authorizeRole("MANAGER"), remove)