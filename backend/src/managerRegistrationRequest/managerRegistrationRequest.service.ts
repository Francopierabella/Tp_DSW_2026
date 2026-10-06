import bcrypt from "bcrypt";
import crypto from "crypto";

import { ManagerRegistrationRequest, ManagerRegistrationRequestStatus } from "./managerRegistrationRequest.entity.js";
import { ManagerRegistrationRequestRepository } from "./managerRegistrationRequest.repository.js";

interface CreateManagerRegistrationRequestInput {
    firstName: string;
    lastName: string;
    e_mail: string;
    password: string;
}

export class ManagerRegistrationRequestService {
    constructor(private repo: ManagerRegistrationRequestRepository) { }
    async findAll(): Promise<ManagerRegistrationRequest[]> {
        return await this.repo.findAll();
    }
    async findOne(id: number): Promise<ManagerRegistrationRequest | undefined> {
        return await this.repo.findOne({ id });
    }
    async findByToken(token: string): Promise<ManagerRegistrationRequest | undefined> {
        return await this.repo.findByToken(token);
    }
    async findByEmail(email: string): Promise<ManagerRegistrationRequest | undefined> {
        return await this.repo.findByEmail(email);
    }
    async create(input: CreateManagerRegistrationRequestInput): Promise<ManagerRegistrationRequest | undefined> {
        const hashedPassword = await bcrypt.hash(input.password, 10);
        const token = crypto.randomBytes(32).toString("hex");
        const request = new ManagerRegistrationRequest(
            input.firstName,
            input.lastName,
            input.e_mail,
            hashedPassword,
            token
        );
        return await this.repo.add(request);
    }
    async updateStatus(id: number, status: ManagerRegistrationRequestStatus): Promise<ManagerRegistrationRequest | undefined> {
        return await this.repo.updateStatus(id, status);
    }
    async remove(id: number): Promise<ManagerRegistrationRequest | undefined> {
        return await this.repo.delete({ id });
    }
}