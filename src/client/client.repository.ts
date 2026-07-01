import { IRepository } from "../shared/base.repository.js";
import { Client } from "./client.entity.js";
import { CLIENTS_MOCK } from "./client.mock.js";

export class ClientRepository implements IRepository<Client>{
    public findAll(): Client[] | undefined {
        return CLIENTS_MOCK;
    }
    public findOne(item : {id:string}) : Client | undefined {
        return CLIENTS_MOCK.find((client) => client.id === item.id);
    }
    public add(item : Client) : Client | undefined{
        CLIENTS_MOCK.push(item);
        return item;
    }
    public update(item : Client) : Client | undefined{
        const clientIndex = CLIENTS_MOCK.findIndex((client) => client.id === item.id)
        if(clientIndex >= 0){
            CLIENTS_MOCK[clientIndex] = {...CLIENTS_MOCK[clientIndex],...item}
        } 
        return CLIENTS_MOCK[clientIndex];
    }
    public delete(item: { id: string; }): { id: string; } | undefined {
        const clientIndexToDelete = CLIENTS_MOCK.findIndex((client) => client.id === item.id)
        if (clientIndexToDelete >= 0){
            CLIENTS_MOCK.splice(clientIndexToDelete,1)
        }
        return {id : item.id}
    }
}