import bcrypt from "bcrypt";
import crypto from "crypto";

import { ManagerRegistrationRequest, ManagerRegistrationRequestStatus } from "./managerRegistrationRequest.entity.js";
import { ManagerRegistrationRequestRepository } from "./managerRegistrationRequest.repository.js";
import { ManagerRepository } from "../manager/manager.repository.js";
import { Manager } from "../manager/manager.entity.js";
import { EmailService } from "../email/email.service.js";

interface CreateManagerRegistrationRequestInput {
    firstName: string;
    lastName: string;
    e_mail: string;
    password: string;
}

export class ManagerRegistrationRequestService {
    constructor(
        private repo: ManagerRegistrationRequestRepository,
        private managerRepo: ManagerRepository,
        private emailService: EmailService
    ) { }

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

    async create(
        input: CreateManagerRegistrationRequestInput
    ): Promise<ManagerRegistrationRequest | undefined> {
        const hashedPassword = await bcrypt.hash(input.password, 10);

        const token = crypto.randomBytes(32).toString("hex");

        const request = new ManagerRegistrationRequest(
            input.firstName,
            input.lastName,
            input.e_mail,
            hashedPassword,
            token
        );

        const savedRequest = await this.repo.add(request);

        if (!savedRequest) {
            return undefined;
        }

        await this.emailService.sendManagerRegistrationEmail(
            savedRequest.firstName,
            savedRequest.lastName,
            savedRequest.e_mail,
            savedRequest.token
        );

        return savedRequest;
    }
    async approve(token: string): Promise<ManagerRegistrationRequest | undefined> {
        const request = await this.repo.findByToken(token);
        if (!request) return undefined;
        if (request.status !== ManagerRegistrationRequestStatus.Pending) {
            throw new Error("La solicitud no está pendiente")
        }
        const manager = new Manager(
            request.firstName,
            request.lastName,
            request.e_mail,
            request.password
        );
        await this.managerRepo.add(manager);
        return await this.repo.updateStatus(request.id!, ManagerRegistrationRequestStatus.Approved);
    }
    async reject(token: string): Promise<ManagerRegistrationRequest | undefined> {
        const request = await this.repo.findByToken(token);
        if (!request) return undefined;
        if (request.status !== ManagerRegistrationRequestStatus.Pending) {
            throw new Error("La solicitud no está pendiente")
        }
        return await this.repo.updateStatus(request.id!, ManagerRegistrationRequestStatus.Rejected);
    }

    async updateStatus(id: number, status: ManagerRegistrationRequestStatus): Promise<ManagerRegistrationRequest | undefined> {
        return await this.repo.updateStatus(id, status);
    }

    async remove(id: number): Promise<ManagerRegistrationRequest | undefined> {
        return await this.repo.delete({ id });
    }

}