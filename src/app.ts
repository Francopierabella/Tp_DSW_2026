import express from "express";
import {customerRouter} from "./customer/customer.routes.js";
import { produtctCategoryRouter } from "./productCategory/productCategory.routes.js";
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const PORT = 3000;
app.use(express.json());

app.use("/api/customers",customerRouter);
app.use("/api/productCategories",produtctCategoryRouter);

app.use((_,res) => {
    return res.status(404).send({message: "Resource not Found"})
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)});





