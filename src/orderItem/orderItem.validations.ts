// import { NextFunction , Request , Response } from "express";


// export const sanitizedOrderItemInput = (req: Request, res: Response, next : NextFunction) => {
//     req.body.sanitizedOrderItemInput = {
//         quantity: req.body.quantity,
//         productId : req.body.productId,
//         orderId : req.body.orderId 
//     }

//     Object.keys(req.body.sanitizedOrderItemInput).forEach((key) => {
//         if(req.body.sanitizedOrderItemInput[key] === undefined){
//             delete req.body.sanitizedOrderItemInput[key]
//         }
//     }); 
//     next();
// }