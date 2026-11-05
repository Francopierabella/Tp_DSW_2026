import { Router } from "express";
import { create, findAll, findOne, update, remove, findByDni, findByEmail, findActives, findInactives, activate, desactivate } from "./customer.controller.js";
import { sanitizedCustomerInput, sanitizedCustomerUpdateInput } from "./customer.validations.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";

export const customerRouter = Router();

// PUBLICO: Registro de cliente
customerRouter.post("/", sanitizedCustomerInput, create)

// PRIVADO (Solo Manager): Ver lista de clientes y buscar clientes
customerRouter.get("/", authenticateToken, authorizeRole("MANAGER"), findAll)
customerRouter.get("/dni/:dni", authenticateToken, authorizeRole("MANAGER"), findByDni)
customerRouter.get("/email/:email", authenticateToken, authorizeRole("MANAGER"), findByEmail)
customerRouter.get("/actives", authenticateToken, authorizeRole("MANAGER"), findActives)
customerRouter.get("/inactives", authenticateToken, authorizeRole("MANAGER"), findInactives)
customerRouter.delete("/:id", authenticateToken, authorizeRole("MANAGER"), remove)

// PRIVADO (Customer o Manager): Ver y editar un cliente en particular
customerRouter.get("/:id", authenticateToken, findOne)
customerRouter.patch("/:id", authenticateToken, sanitizedCustomerUpdateInput, update)
customerRouter.patch("/:id/activate", authenticateToken, authorizeRole("MANAGER"), activate)
customerRouter.patch("/:id/desactivate", authenticateToken, authorizeRole("MANAGER"), desactivate)