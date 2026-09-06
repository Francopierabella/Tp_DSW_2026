
import { IRepository } from "../shared/base.repository.js";
import { ProductCategory } from "./productCategory.entity.js";

//Service: 
// va a contener la lógica de negocio y utilizar el repository.
export class ProductCategoryService {
    constructor(private readonly repo: IRepository<ProductCategory>) { } // Esto es lo de inyeccion de dependencias.

    async findAll(): Promise<ProductCategory[] | undefined> {
        return await this.repo.findAll();
    }
    async findOne(id: number): Promise<ProductCategory | undefined> {
        return await this.repo.findOne({ id });
    }
    async create(input: Omit<ProductCategory, "id">): Promise<ProductCategory | undefined> {
        try {
            const newProductCategory = new ProductCategory(input.name);
            return await this.repo.add(newProductCategory);
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("Ya existe una categoría con ese nombre");
                // MySQL utiliza ER_DUP_ENTRY cuando intentamos insertar un valor que viola una restricción UNIQUE.
            }
            throw error;
            // Si el error no era un duplicado 
            //  que sea tratado como otro error
        }
    }
    async update(id: number, input: ProductCategory): Promise<ProductCategory | undefined> {
        return await this.repo.update(id, input);
    }
    async remove(id: number): Promise<ProductCategory | undefined> {
        return await this.repo.delete({ id });
    }
}