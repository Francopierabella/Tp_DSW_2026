// To be updated

// import { NextFunction , Request , Response } from "express";


// export const sanitizedPurchaseOrderItemInput = (req: Request, res: Response, next : NextFunction) => {
//     req.body.sanitizedPurchaseOrderItemInput = {
//         quantity: req.body.quantity,
//         productId : req.body.productId,
//         orderId : req.body.orderId 
//     }

//     Object.keys(req.body.sanitizedPurchaseOrderItemInput).forEach((key) => {
//         if(req.body.sanitizedPurchaseOrderItemInput[key] === undefined){
//             delete req.body.sanitizedPurchaseOrderItemInput[key]
//         }
//     }); 
//     next();
// }