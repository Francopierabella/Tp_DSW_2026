
// import { IRepository } from "../shared/base.repository.js";
// import { ProductCategory } from "./productCategory.entity.js";
// import { CATEGORY_PRODUCT_MOCK } from "./productCategory.mock.js";

// export class ProductCategoryRepository implements IRepository<ProductCategory> {
//     private ProductCategorys: ProductCategory[] = CATEGORY_PRODUCT_MOCK;

//     public findAll(): ProductCategory[] | undefined {
//         return this.ProductCategorys;
//     }
//     public findOne(item: { id: string; }): ProductCategory | undefined {
//         return this.ProductCategorys.find((ProductCategory) => ProductCategory.id === item.id)
//     }
//     public add(item : ProductCategory) : ProductCategory | undefined {
//         this.ProductCategorys.push(item);
//         return item
//     }
//     public update(item: ProductCategory): ProductCategory | undefined {
//         const ProductCategoryIdIndexToUpdate = this.ProductCategorys.findIndex((ProductCategory) => ProductCategory.id === item.id);
//         if (ProductCategoryIdIndexToUpdate < 0){
//             return undefined;
//         }
//         CATEGORY_PRODUCT_MOCK[ProductCategoryIdIndexToUpdate] = {...this.ProductCategorys[ProductCategoryIdIndexToUpdate],...item}
//         return this.ProductCategorys[ProductCategoryIdIndexToUpdate];
//     }
//     public delete(item: { id: string; }): { id: string; } | undefined {
//         const ProductCategoryIdIndexToDelete = this.ProductCategorys.findIndex((ProductCategory) => ProductCategory.id === item.id);
//         if (ProductCategoryIdIndexToDelete < 0){
//             return undefined;
//         }
//         this.ProductCategorys.splice(ProductCategoryIdIndexToDelete,1);
//         return {id: item.id}
//         ;
//     }
// }