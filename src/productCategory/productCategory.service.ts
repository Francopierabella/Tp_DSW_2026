
// import { IRepository } from "../shared/base.repository.js";
// import { ProductCategory } from "./productCategory.entity.js";
// export class ProductCategoryService {
//     constructor(private repo : IRepository<ProductCategory>){}
//     findAll() : ProductCategory[] | undefined {
//             return this.repo.findAll();
//         }
//         findOne(id : string) : ProductCategory | undefined {
//             return this.repo.findOne({id});
//         }
//         create(input : ProductCategory) : ProductCategory {
//             const customer = new ProductCategory(
//                 input.name,
//                 input.id
//             );
//             this.repo.add(customer);
//             return customer
//         }
//         update(id:string, input : Partial<ProductCategory>) : ProductCategory | undefined {
//             return this.repo.update({id,...input} as ProductCategory);
//         } 
//         remove(id:string) : {id:string} | undefined {
//             return this.repo.delete({id})
//         }
// }