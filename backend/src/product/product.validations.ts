// To be updated


// import { NextFunction, Request, Response } from "express";

// export const sanitizedProductInput = (req : Request,res : Response, next: NextFunction) => {
//     req.body.sanitizedProductInput = {
//         name : req.body.name,
//         description : req.body.description,
//         stock : req.body.stock,
//         price : req.body.price,
//         brand : req.body.brand,
//         gender : req.body.gender,
//         categoryId : req.body.categoryId
//     }
//     Object.keys(req.body.sanitizedProductInput).forEach((key) => {
//         if(req.body.sanitizedProductInput[key] === undefined){
//             delete req.body.sanitizedProductInput[key]
//         }
//     })
//     next()
// }