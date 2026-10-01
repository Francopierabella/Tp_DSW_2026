import { Manager } from "./manager.entity.js";
import { IRepository } from "../shared/base.repository.js";
import bcrypt from "bcrypt";

export class ManagerService {
    constructor(private readonly repo: IRepository<Manager>) { };

    async findAll(): Promise<Manager[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(id: number): Promise<Manager | undefined> {
        return await this.repo.findOne({ id });
    }
    async create(input: Omit<Manager, "id">): Promise<Manager | undefined> {
        const hashedPassword = await bcrypt.hash(input.password, 10);

        const manager = new Manager(
            input.firstName,
            input.lastName,
            input.e_mail,
            hashedPassword
        );
        return await this.repo.add(manager);
    }
    async update(id: number, input: Manager): Promise<Manager | undefined> {
        return await this.repo.update(id, input);
    }
    async remove(id: number): Promise<Manager | undefined> {
        return await this.repo.delete({ id });
    }
}