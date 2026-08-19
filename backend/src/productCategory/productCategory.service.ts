
import { IRepository } from "../shared/base.repository.js";
import { ProductCategory} from "./productCategory.entity.js";

//Service: 
// va a contener la lógica de negocio y utilizar el repository.
export class ProductCategoryService {
    constructor(private readonly repo : IRepository<ProductCategory>){} // Esto es lo de inyeccion de dependencias.
    
    async findAll() : Promise <ProductCategory[] | undefined > {
        return  await this.repo.findAll();
    }
    async findOne(id : number) : Promise<ProductCategory | undefined> {
        return await this.repo.findOne({id});
    }
    async create(input : Omit<ProductCategory,"id">) : Promise<ProductCategory | undefined> {
        const productCategory = new ProductCategory(
            input.name,
        ); // Constructoor
        return await this.repo.add(productCategory);
    }
    async update(id:number, input : ProductCategory) : Promise< ProductCategory | undefined> {
         return await this.repo.update(id, input);
    } 
    async remove(id:number) : Promise<ProductCategory | undefined> {
        return await this.repo.delete({id});
    }
}