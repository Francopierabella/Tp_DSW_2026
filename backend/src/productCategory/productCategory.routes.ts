import { Router } from "express";
import { sanitizedProductCategoryInput } from "./productCategory.validations.js";
import { create, findAll, findOne, update, remove } from "./productCategory.controller.js"
import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";


export const productCategoryRouter = Router();

productCategoryRouter.get("/", findAll);
productCategoryRouter.get("/:id", findOne);
productCategoryRouter.post("/", authenticateToken, authorizeRole("MANAGER"), sanitizedProductCategoryInput, create);
productCategoryRouter.patch("/:id", authenticateToken, authorizeRole("MANAGER"), sanitizedProductCategoryInput, update);
productCategoryRouter.delete("/:id", authenticateToken, authorizeRole("MANAGER"), remove);
