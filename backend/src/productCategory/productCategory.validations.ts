import {NextFunction,Request,Response} from "express";

export const sanitizedProductCategoryInput = (req : Request,res : Response, next : NextFunction) => {
    req.body.sanitizedProductCategoryInput = {
        name : req.body.name,
    }
    Object.keys(req.body.sanitizedProductCategoryInput).forEach((key) => {
        if(req.body.sanitizedProductCategoryInput[key] === undefined){
            delete req.body.sanitizedProductCategoryInput[key]
        }
    })
    next();
}