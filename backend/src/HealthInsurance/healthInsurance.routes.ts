import { create, findAll, findOne, update, remove } from "./healthInsurance.controller.js";
import { Router } from "express";
import { sanitizedHealthInsuranceInput } from "./healthInsurance.validations.js";
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";
export const healthInsuranceRouter = Router();

healthInsuranceRouter.get('/', findAll);
healthInsuranceRouter.get('/:id', findOne);
healthInsuranceRouter.post('/', authenticateToken, authorizeRole("MANAGER"), sanitizedHealthInsuranceInput, create);
healthInsuranceRouter.put('/:id', authenticateToken, authorizeRole("MANAGER"), sanitizedHealthInsuranceInput, update);
healthInsuranceRouter.delete('/:id', authenticateToken, authorizeRole("MANAGER"), remove);