// import { Request, Response } from "express";
// import { OrderItemRepository } from "./orderItem.repository.js";
// import { OrderItemService } from "./orderItem.service.js";

// const service = new OrderItemService(new OrderItemRepository());

// export const findAll = (req:Request,res:Response) => {
//     res.json(service.findAll());
// }
// export const findOne = (req:Request , res: Response) => {
//     const id = req.params.id as string;
//     const orderItem = service.findOne(id);

//     if(!orderItem){
//         return res.status(404).send({message: "OrderItem Not Found"});
//     }
//     return res.json(orderItem);
// }

// export const create = (req:Request,res:Response) => {
//     const orderItem = service.create(req.body.sanitizedOrderItemInput);
//     return res.status(201).send({message : "OrderItem created", data: orderItem});
// }

// export const update = (req:Request,res:Response) => {
//     const id = req.params.id as string;
//     const orderItem = service.update(id,req.body.sanitizedOrderItemInput);
//     if(!orderItem){
//         return res.status(404).send({message: "OrderItem not Found"});
//     }
//     return res.json({message: "OrderItem updated",data: orderItem});
// }

// export const remove = (req:Request,res:Response) => {
//     const id = req.params.id as string;
//     const result = service.remove(id);
//     if(!result){
//         return res.status(404).send({message: "OrderItem not Found"});
//     }
//     return res.json({message: `Order item with id = ${result?.id} removed`});
// }