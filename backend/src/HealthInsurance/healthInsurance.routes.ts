import { create, findAll, findOne, update, remove } from "./healthInsurance.controller.js";
import { Router } from "express";
import { SanitizedHealthInsuranceInput } from "./healthInsurance.validations.js";

export const healthInsuranceRouter = Router();

healthInsuranceRouter.get('/', findAll);
healthInsuranceRouter.get('/:id', findOne);
healthInsuranceRouter.post('/', SanitizedHealthInsuranceInput, create);
healthInsuranceRouter.put('/:id', SanitizedHealthInsuranceInput, update);
healthInsuranceRouter.delete('/:id', remove);