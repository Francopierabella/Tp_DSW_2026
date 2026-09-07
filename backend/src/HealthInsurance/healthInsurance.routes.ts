import { create, findAll, findOne, update, remove } from "./healthInsurance.controller.js";
import { Router } from "express";
import { SanitizedHealthInsuranceInput } from "./healthInsurance.validations.js";

export const HealthInsuranceRouter = Router();

HealthInsuranceRouter.get('/', findAll);
HealthInsuranceRouter.get('/:id', findOne);
HealthInsuranceRouter.post('/', SanitizedHealthInsuranceInput, create);
HealthInsuranceRouter.put('/:id', SanitizedHealthInsuranceInput, update);
HealthInsuranceRouter.delete('/:id', remove);