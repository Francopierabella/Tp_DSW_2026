import { Router } from "express";
import { findAll, findOne, create, update, remove } from "./manager.controller.js";
import { sanitizedManagerInput } from "./manager.validations";

export const managerRouter = Router();

managerRouter.get('/', findAll);
managerRouter.get('/:id', findOne);
managerRouter.post('/', sanitizedManagerInput, create);
managerRouter.put('/:id', sanitizedManagerInput, update);
managerRouter.delete('/:id', remove);
