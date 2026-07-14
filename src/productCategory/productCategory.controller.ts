import { Request , Response } from "express";
import { ProductCategoryRepository } from "./productCategory.repository.js";
import { ProductCategoryService } from "./productCategory.service.js";

const service = new ProductCategoryService(new ProductCategoryRepository());

async function findAll(req : Request, res: Response) {
    res.json(await service.findAll());
}

async function findOne(req : Request, res : Response){
    const id = Number(req.params.id);
    const productCategory = await service.findOne(id);
    if (!productCategory){
        return res.status(404).send({message : "ProductCategory not found"})
    }
    return res.json(productCategory);
}

async function create (req: Request , res: Response){
    const productCategory = await service.create(req.body.sanitizedProductCategoryInput);
    return res.status(201).send({message: "ProductCategory created", data: productCategory});
}

async function update(req : Request, res: Response) {
    const id = Number(req.params.id);
    const productCategory = await service.update(id,req.body.sanitizedProductCategoryInput);
    
    if(!productCategory) {
        return res.status(404).send({message : "ProductCategory not found"});
    }
    return res.json({message: "ProductCategory updated successfully",data: productCategory});
}

async function remove(req: Request, res: Response){
    const id = Number(req.params.id);
    const result = await service.remove(id);
    const nameProductCategoryDeleted = await service.findOne(id)

    if(!result){
        res.status(404).send({message: "ProductCategory not Found"});
    }
    res.json({message : `ProductCategory with id = ${result?.id} and name = ${nameProductCategoryDeleted?.name}successfully deleted`})
}

export {create,findAll,findOne,update,remove}