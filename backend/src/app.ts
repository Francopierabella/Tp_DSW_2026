import 'reflect-metadata';
import express from "express";
// import {customerRouter} from "./customer/customer.routes.js";
import { productCategoryRouter } from "./productCategory/productCategory.routes.js";
import dotenv from 'dotenv';
import { orm , syncSchema} from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());

const PORT = 3000;
app.use(express.json());

// luego de los middlewares base , como express y .json,+

app.use((req,res,next) => {
    RequestContext.create(orm.em, next); // em => entity manager
})

//  y antes de los use de los routers, sincronizamos el esquema de la base de datos

// app.use("/api/customers",customerRouter);
app.use("/api/productCategories",productCategoryRouter);

app.use((_,res) => {
    return res.status(404).send({message: "Resource not Found"})
})

await syncSchema();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)});





