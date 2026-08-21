import 'reflect-metadata';
import express from "express";
// import {customerRouter} from "./customer/customer.routes.js";
import { productCategoryRouter } from "./productCategory/productCategory.routes.js";
import dotenv from 'dotenv';
import { orm , syncSchema} from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import cors from "cors";
// CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad de los navegadores web.
//  Permite que una página web pida datos a un servidor que está en un dominio, puerto o protocolo diferente al de la página.

dotenv.config();
const app = express();
// registra un middleware de Express.
// Un middleware es una función que se ejecuta durante el procesamiento de una petición.
app.use(cors());

const PORT = 3000;
app.use(express.json());


app.use((req,res,next) => {
    RequestContext.create(orm.em, next); // em => entity manager
})

// Se crea un contexto de MikroORM para cada petición HTTP.
// Esto permite que el EntityManager (orm.em) gestione las entidades
// y operaciones de base de datos dentro del contexto de esa petición.
// Una vez creado el contexto, next() continúa con el siguiente middleware o ruta.


// app.use("/api/customers",customerRouter);
app.use("/api/productCategories",productCategoryRouter);

app.use((_,res) => {
    return res.status(404).send({message: "Resource not Found"})
})

await syncSchema();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)});





