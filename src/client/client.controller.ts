import { Request , Response } from "express";
import { ClientRepository } from "./client.repository.js";
import { ClientService } from "./client.service.js";

const service = new ClientService(new ClientRepository());

export const findAll = (req : Request, res: Response) => {
    res.json(service.findAll());
}

export const findOne = (req : Request, res : Response) => {
    const id = req.params.id as string;
    const client = service.findOne(id);
    if (!client){
        return res.status(404).send({message : "Client not found"})
    }
    return res.json(client);
}

export const create = (req: Request , res: Response) => {
    const client = service.create(req.body.sanitizeClientInput);
    return res.status(201).send({message: "Client created", data: client});
}

export const update = (req : Request, res: Response) => {
    const id = req.params.id as string;
    const client = service.update(id,req.body.sanitizeClientInput);
    
    if(!client) {
        return res.status(404).send({message : "Client not found"});
    }
    return res.json({message: "Client updated successfully",data: client});
}

export const remove = (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = service.remove(id);

    if(!result){
        res.status(404).send({message: "Client not Found"});
    }
    res.json({message : `Client with id = ${result?.id} successfully deleted`})
}