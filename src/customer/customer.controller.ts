import { Request , Response } from "express";
import { CustomerRepository } from "./customer.repository.js";
import { CustomerService } from "./customer.service.js";

const service = new CustomerService(new CustomerRepository());

async function findAll (req : Request, res: Response) {
    res.json(await service.findAll());
}

async function findOne (req : Request, res : Response) {
    const id = Number(req.params.id as string);
    const customer =  await service.findOne(id);
    if (!customer){
        return res.status(404).send({message : "Customer not found"})
    }
    return res.json(customer);
}

async function create (req: Request , res: Response) {
    const customer = await service.create(req.body.sanitizedCustomerInput);
    return res.status(201).send({message: "Customer created", data: customer});
}

async function update (req : Request, res: Response) {
    const id = Number(req.params.id);
    const customer = await service.update(id,req.body.sanitizedCustomerInput);
    
    if(!customer) {
        return res.status(404).send({message : "Customer not found"});
    }
    return res.json({message: "Customer updated successfully",data: customer});
}

async function remove (req: Request, res: Response){
    const id = Number(req.params.id);
    const result = await service.remove(id);

    if(!result){
        res.status(404).send({message: "Customer not Found"});
    }
     res.json({message : `Customer with id = ${result?.id} successfully deleted`})
}

export {create,findAll,findOne,update,remove}