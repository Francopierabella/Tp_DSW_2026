// import {IRepository} from '../shared/base.repository.js';
// import {Product} from './product.entity.js';
// import {PRODUCTS_MOCK} from './product.mock.js';

// export class ProductRepository implements IRepository<Product>{
//     // Se almacena la colección de productos como un atributo privado
//     // para que el repositorio trabaje sobre sus propios datos y no
//     // dependa directamente de la constante PRODUCTS_MOCK.
//     private products: Product[] = PRODUCTS_MOCK;

//     public findAll() : Product[] | undefined{
//         return this.products;
//     }
//     public findOne(item : {id:string}) : Product | undefined{
//         return this.products.find((product) => product.id === item.id)
//     }   
//     public add(item : Product) : Product | undefined {
//         this.products.push(item);
//         return item;
//     }
//     public update(item : Product) : Product | undefined{
//         const productIndex = this.products.findIndex((product) => product.id === item.id)
//         if (productIndex < 0){
//             return undefined;
//         }
//         PRODUCTS_MOCK[productIndex] = {...this.products[productIndex],...item}
//         return this.products[productIndex];
//     }
//     public delete(item : {id:string}) : {id:string} | undefined{
//         const productIndexToDelete = this.products.findIndex((product) => product.id === item.id)
//         if(productIndexToDelete < 0){
//             return undefined;
//         }
//         this.products.splice(productIndexToDelete,1)
//         return {id: item.id};
//     } 
// }