import { IRepository } from "../shared/base.repository.js";
import { Client } from "./client.entity.js";

export class ClientService {
    constructor(private repo : IRepository<Client>){}
    findAll() : Client[] | undefined {
        return this.repo.findAll();
    }
    findOne(id : string) : Client | undefined {
        return this.repo.findOne({id});
    }
    create(input : Omit<Client,"id">) : Client {
        const client = new Client(
            input.name,
            input.lastName,
            input.e_mail,
            input.password
        );
        this.repo.add(client);
        return client
    }
    update(id:string, input : Partial<Client>) : Client | undefined {
        return this.repo.update({id,...input} as Client);
    } 
    remove(id:string) : {id:string} | undefined {
        return this.repo.delete({id})
    }
}