import { NextFunction , Request , Response} from "express";


export const sanitizedCustomerInput = (req : Request ,res: Response ,next: NextFunction) => {
    req.body.sanitizedCustomerInput = {
        name : req.body.name,
        lastName : req.body.lastName,
        phone : req.body.phone,
        address : req.body.address,
        healthInsuranceId : req.body.healthInsuranceId,
        e_mail : req.body.e_mail,
        password : req.body.password
    }
    Object.keys(req.body.sanitizedCustomerInput).forEach((key) => {
        if(req.body.sanitizedCustomerInput[key] === undefined){
            delete req.body.sanitizedCustomerInput[key]
        }
    })
    next()
}