// import { Request , Response } from "express";
// import { ProductCategoryRepository } from "./productCategory.repository.js";
// import { ProductCategoryService } from "./productCategory.service.js";

// const service = new ProductCategoryService(new ProductCategoryRepository());

// export const findAll = (req : Request, res: Response) => {
//     res.json(service.findAll());
// }

// export const findOne = (req : Request, res : Response) => {
//     const id = req.params.id as string;
//     const productCategory = service.findOne(id);
//     if (!productCategory){
//         return res.status(404).send({message : "ProductCategory not found"})
//     }
//     return res.json(productCategory);
// }

// export const create = (req: Request , res: Response) => {
//     const productCategory = service.create(req.body.sanitizeProductCategoryInput);
//     return res.status(201).send({message: "ProductCategory created", data: productCategory});
// }

// export const update = (req : Request, res: Response) => {
//     const id = req.params.id as string;
//     const productCategory = service.update(id,req.body.sanitizeProductCategoryInput);
    
//     if(!productCategory) {
//         return res.status(404).send({message : "ProductCategory not found"});
//     }
//     return res.json({message: "ProductCategory updated successfully",data: productCategory});
// }

// export const remove = (req: Request, res: Response) => {
//     const id = req.params.id as string;
//     const result = service.remove(id);
//     const nameProductCategoryDeleted = service.findOne(id)

//     if(!result){
//         res.status(404).send({message: "ProductCategory not Found"});
//     }
//     res.json({message : `ProductCategory with id = ${result?.id} and name = ${nameProductCategoryDeleted?.name}successfully deleted`})
// }