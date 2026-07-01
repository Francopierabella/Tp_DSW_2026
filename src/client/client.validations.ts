import { NextFunction , Request , Response} from "express";


export const sanitizeClientInput = (req : Request ,res: Response ,next: NextFunction) => {
    req.body.sanitizeClientInput = {
        name : req.body.name,
        lastName : req.body.lastName,
        e_mail : req.body.e_email,
        password : req.body.password
    }
    Object.keys(req.body.sanitizeClientInput).forEach((key) => {
        if(req.body.sanitizeClientInput[key] === undefined){
            delete req.body.sanitizeClientInput[key]
        }
    })
    next()
}