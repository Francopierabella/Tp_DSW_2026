import { Router } from "express";
import { findAll, findOne, create, findByEmail, findByToken, remove } from "./managerRegistrationRequest.controller.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";

export const managerRegistrationRequestRouter = Router();
managerRegistrationRequestRouter.get('/', authenticateToken, authorizeRole('MANAGER'), findAll);
managerRegistrationRequestRouter.get('/:id', authenticateToken, authorizeRole('MANAGER'), findOne);
managerRegistrationRequestRouter.get('/token/:token', authenticateToken, authorizeRole('MANAGER'), findByToken);
managerRegistrationRequestRouter.get('/email/:email', authenticateToken, authorizeRole('MANAGER'), findByEmail);
managerRegistrationRequestRouter.post('/', create);
managerRegistrationRequestRouter.delete('/:id', authenticateToken, authorizeRole('MANAGER'), remove);
