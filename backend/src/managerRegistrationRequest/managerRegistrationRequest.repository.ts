import { orm } from "../shared/db/orm.js";
import { ManagerRegistrationRequest, ManagerRegistrationRequestStatus } from "./managerRegistrationRequest.entity.js";

export class ManagerRegistrationRequestRepository {

    public async findAll(): Promise<ManagerRegistrationRequest[]> {
        return await orm.em.find(
            ManagerRegistrationRequest,
            {}
        );
    }

    public async findOne(item: { id: number }): Promise<ManagerRegistrationRequest | undefined> {
        const found = await orm.em.findOne(ManagerRegistrationRequest, { id: item.id });
        return found ?? undefined;
    }

    public async findByToken(token: string): Promise<ManagerRegistrationRequest | undefined> {
        const found = await orm.em.findOne(ManagerRegistrationRequest, { token });
        return found ?? undefined;
    }

    public async findByEmail(e_mail: string): Promise<ManagerRegistrationRequest | undefined> {
        const found = await orm.em.findOne(ManagerRegistrationRequest, { e_mail });
        return found ?? undefined;
    }

    public async add(item: ManagerRegistrationRequest): Promise<ManagerRegistrationRequest | undefined> {
        try {
            const newRequest = orm.em.create(ManagerRegistrationRequest, item);
            await orm.em.persistAndFlush(newRequest);
            return newRequest;
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("A manager registration request with that e-mail or token already exists.");
            }
            throw error;
        }
    }

    public async updateStatus(id: number, status: ManagerRegistrationRequestStatus): Promise<ManagerRegistrationRequest | undefined> {
        const request = await this.findOne({ id });
        if (!request) {
            return undefined;
        }

        request.status = status;

        await orm.em.flush();

        return request;
    }

    public async delete(item: { id: number }): Promise<ManagerRegistrationRequest | undefined> {
        const request = await this.findOne({ id: item.id });
        if (!request) {
            return undefined;
        }

        await orm.em.removeAndFlush(request);

        return request;
    }
}