// To be updated

// import { Request, Response } from "express";
// import { PurchaseOrderItemRepository } from "./purchasePurchaseOrderItem.repository.js";
// import { PurchaseOrderItemService } from "./purchasePurchaseOrderItem.service.js";

// const service = new PurchaseOrderItemService(new PurchaseOrderItemRepository());

// export const findAll = (req:Request,res:Response) => {
//     res.json(service.findAll());
// }
// export const findOne = (req:Request , res: Response) => {
//     const id = req.params.id as string;
//     const purchasePurchaseOrderItem = service.findOne(id);

//     if(!purchasePurchaseOrderItem){
//         return res.status(404).send({message: "PurchaseOrderItem Not Found"});
//     }
//     return res.json(purchasePurchaseOrderItem);
// }

// export const create = (req:Request,res:Response) => {
//     const purchasePurchaseOrderItem = service.create(req.body.sanitizedPurchaseOrderItemInput);
//     return res.status(201).send({message : "PurchaseOrderItem created", data: purchasePurchaseOrderItem});
// }

// export const update = (req:Request,res:Response) => {
//     const id = req.params.id as string;
//     const purchasePurchaseOrderItem = service.update(id,req.body.sanitizedPurchaseOrderItemInput);
//     if(!purchasePurchaseOrderItem){
//         return res.status(404).send({message: "PurchaseOrderItem not Found"});
//     }
//     return res.json({message: "PurchaseOrderItem updated",data: purchasePurchaseOrderItem});
// }

// export const remove = (req:Request,res:Response) => {
//     const id = req.params.id as string;
//     const result = service.remove(id);
//     if(!result){
//         return res.status(404).send({message: "PurchaseOrderItem not Found"});
//     }
//     return res.json({message: `Order item with id = ${result?.id} removed`});
// }