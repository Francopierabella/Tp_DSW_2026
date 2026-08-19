import { Router } from "express";
import { sanitizedProductCategoryInput } from "./productCategory.validations.js";
import {create,findAll,findOne,update,remove} from "./productCategory.controller.js"

export const productCategoryRouter = Router();
productCategoryRouter.get("/",findAll);
productCategoryRouter.get("/:id",findOne);
productCategoryRouter.post("/",sanitizedProductCategoryInput,create);
productCategoryRouter.put("/:id",sanitizedProductCategoryInput,update);
productCategoryRouter.patch("/:id",sanitizedProductCategoryInput,update);
productCategoryRouter.delete("/:id",remove);
