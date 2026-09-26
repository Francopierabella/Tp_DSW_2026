import { Router } from "express";
import { sanitizedProductInput, sanitizedUpdateProductInput } from "./product.validations.js";
import { create, findAll, findOne, remove, update } from './product.controller.js'

export const productRouter = Router();

productRouter.get('/', findAll);
productRouter.get('/:id', findOne);
productRouter.post('/', sanitizedProductInput, create);
productRouter.patch('/:id', sanitizedUpdateProductInput, update);
productRouter.delete('/:id', remove);

