// To be updated

// import { Router } from "express";
// import { sanitizedCustomerInput } from "./customer.validations.js";
// import {create,findAll,findOne,update,remove} from "./customer.controller.js"

// // Router es una herramienta que ofrece Express para organizar las rutas de la aplicación.
// export const customerRouter = Router();
// // Se crea una instancia de Router donde se registrarán las rutas de Cliente

// // Ese objeto será el encargado de registrar todas las rutas relacionadas con Cliente.

// // Significa: "Voy a crear el administrador de rutas de Clientes."
// customerRouter.get("/", findAll)
// // Cuando llega una petición GET a /customers => "/",
// // se ejecuta el método getAll del controlador
// customerRouter.get("/:id", findOne)
// // Cuando alguien haga un POST a /customers, ejecutar la función add.
// customerRouter.post("/", sanitizedCustomerInput, create)
// customerRouter.put("/:id", sanitizedCustomerInput, update)
// customerRouter.patch("/:id", sanitizedCustomerInput, update)
// customerRouter.delete("/:id", remove)