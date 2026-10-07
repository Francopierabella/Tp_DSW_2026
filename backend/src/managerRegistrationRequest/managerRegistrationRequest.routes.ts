import { Router } from "express";
import { findAll, findOne, create, findByEmail, findByToken, remove, approve, reject } from "./managerRegistrationRequest.controller.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";

export const managerRegistrationRequestRouter = Router();
managerRegistrationRequestRouter.get('/', authenticateToken, authorizeRole('MANAGER'), findAll);
managerRegistrationRequestRouter.get('/:id', authenticateToken, authorizeRole('MANAGER'), findOne);
managerRegistrationRequestRouter.get('/token/:token', findByToken);
managerRegistrationRequestRouter.get('/email/:email', authenticateToken, authorizeRole('MANAGER'), findByEmail);
managerRegistrationRequestRouter.post('/', create);
managerRegistrationRequestRouter.post('/approve/:token', approve);
managerRegistrationRequestRouter.post('/reject/:token', reject);
managerRegistrationRequestRouter.delete('/:id', authenticateToken, authorizeRole('MANAGER'), remove);
