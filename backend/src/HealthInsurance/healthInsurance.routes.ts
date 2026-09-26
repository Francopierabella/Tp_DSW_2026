import { create, findAll, findOne, update, remove } from "./healthInsurance.controller.js";
import { Router } from "express";
import { sanitizedHealthInsuranceInput } from "./healthInsurance.validations.js";

export const healthInsuranceRouter = Router();

healthInsuranceRouter.get('/', findAll);
healthInsuranceRouter.get('/:id', findOne);
healthInsuranceRouter.post('/', sanitizedHealthInsuranceInput, create);
healthInsuranceRouter.put('/:id', sanitizedHealthInsuranceInput, update);
healthInsuranceRouter.delete('/:id', remove);