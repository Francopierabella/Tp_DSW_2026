import { Router } from "express";
import { create, findAll, findOne, update, remove, findByDni, findByEmail } from "./customer.controller.js";
import { sanitizedCustomerInput, sanitizedCustomerUpdateInput } from "./customer.validations.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";

export const customerRouter = Router();

// PUBLICO: Registro de cliente
customerRouter.post("/", sanitizedCustomerInput, create)

// PRIVADO (Solo Manager): Ver lista de clientes y buscar clientes
customerRouter.get("/", authenticateToken, authorizeRole("MANAGER"), findAll)
customerRouter.get("/dni/:dni", authenticateToken, authorizeRole("MANAGER"), findByDni)
customerRouter.get("/email/:email", authenticateToken, authorizeRole("MANAGER"), findByEmail)
customerRouter.delete("/:id", authenticateToken, authorizeRole("MANAGER"), remove)

// PRIVADO (Customer o Manager): Ver y editar un cliente en particular
customerRouter.get("/:id", authenticateToken, findOne)
customerRouter.patch("/:id", authenticateToken, sanitizedCustomerUpdateInput, update)