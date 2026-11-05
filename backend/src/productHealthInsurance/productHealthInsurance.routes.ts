import { Router } from "express";
import {
    findAll, findOne, findByHealthInsurance, findByProduct, findByProductAndHealthInsurance,
    update, remove, create
} from "./productHealthInsurance.controller.js";

import { authenticateToken, authorizeRole } from "../middleware/auth.middleware.js";
import { sanitizedProductHealthInsuranceInput, sanitizedProductHealthInsuranceUpdateInput } from "./productHealthInsurance.validations.js";

export const productHealthInsuranceRouter = Router();

productHealthInsuranceRouter.get("/", findAll);
productHealthInsuranceRouter.get("/:id", findOne);
productHealthInsuranceRouter.get("/healthInsurance/:healthInsurance", findByHealthInsurance);
productHealthInsuranceRouter.get("/product/:product", findByProduct);
productHealthInsuranceRouter.get("/product/:product/healthInsurance/:healthInsurance", findByProductAndHealthInsurance);
productHealthInsuranceRouter.post("/", authenticateToken, authorizeRole("MANAGER"), sanitizedProductHealthInsuranceInput, create);
productHealthInsuranceRouter.patch("/:id", authenticateToken, authorizeRole("MANAGER"), sanitizedProductHealthInsuranceUpdateInput, update);
productHealthInsuranceRouter.delete("/:id", authenticateToken, authorizeRole("MANAGER"), remove);



