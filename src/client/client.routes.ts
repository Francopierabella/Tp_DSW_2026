import { Router } from "express";
import { sanitizeClientInput } from "./client.validations.js";
import {create,findAll,findOne,update,remove} from "./client.controller.js"


export const clientRouter = Router();
clientRouter.get("/", findAll)
clientRouter.get("/:id", findOne)
clientRouter.post("/", sanitizeClientInput, create)
clientRouter.put("/:id", sanitizeClientInput, update)
clientRouter.patch("/:id", sanitizeClientInput, update)
clientRouter.delete("/:id", remove)