import { Router } from "express";
import { findAll, findOne, create, update, remove } from "./manager.controller.js";
import { sanitizedManagerInput } from "./manager.validations.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";

export const managerRouter = Router();

managerRouter.get('/', authenticateToken, authorizeRole("MANAGER"), findAll);
managerRouter.get('/:id', authenticateToken, authorizeRole("MANAGER"), findOne);
managerRouter.post('/', authenticateToken, authorizeRole("MANAGER"), sanitizedManagerInput, create);
managerRouter.put('/:id', authenticateToken, authorizeRole("MANAGER"), sanitizedManagerInput, update);
managerRouter.delete('/:id', authenticateToken, authorizeRole("MANAGER"), remove);
