import { IRepository } from "../shared/base.repository.js";
import { HealthInsurance } from "./healthInsurance.entity.js";


export class HealthInsuranceService {
    constructor(private readonly repo: IRepository<HealthInsurance>) { }
    async findAll(): Promise<HealthInsurance[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(id: number): Promise<HealthInsurance | undefined> {
        return await this.repo.findOne({ id });
    }
    async create(input: Omit<HealthInsurance, "id">): Promise<HealthInsurance | undefined> {
        const newHealthInsurance = new HealthInsurance(
            input.name,
            input.coveragePercentage
        )
        try {
            return await this.repo.add(newHealthInsurance);
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("A health insurance with that name already exists.");
            }
            throw error;
        }
    }
    async update(id: number, input: HealthInsurance): Promise<HealthInsurance | undefined> {
        return await this.repo.update(id, input);
    }
    async remove(id: number): Promise<HealthInsurance | undefined> {
        return await this.repo.delete({ id });
    }
}