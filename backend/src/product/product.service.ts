// To be updated


// import { IRepository } from "../shared/base.repository.js";
// import { Product } from "./product.entity.js";
// // Importa la entidad Product y la interfaz IRepository.
// // El servicio trabajará sobre cualquier repositorio que implemente IRepository.
// export class ProductService {

//     // El constructor recibe un repositorio de productos.
//     // Gracias a la inyección de dependencias, el servicio no depende
//     // de una implementación específica del repositorio.
//     constructor(private repo: IRepository<Product>) {}

//     // Devuelve todos los productos almacenados.
//     // Simplemente delega la búsqueda al repositorio.
//     findAll(): Product[] | undefined {
//         return this.repo.findAll();
//     }

//     // Busca un producto por su id.
//     // Recibe el id como parámetro y se lo pasa al repositorio.
//     findOne(id: string): Product | undefined {
//         return this.repo.findOne({ id });
//     }

//     // Crea un nuevo producto.
//     // Omit<Product, "id"> indica que el usuario NO debe enviar el id,
//     // ya que éste se genera automáticamente en el constructor de Product.
//     create(input: Omit<Product, "id">): Product {

//         // Se crea una nueva instancia de Product con los datos recibidos.
//         const product = new Product(
//             input.name,
//             input.description,
//             input.stock,
//             input.price,
//             input.brand,
//             input.gender,
//             input.categoryId
//         );

//         // Se agrega el nuevo producto al repositorio.
//         this.repo.add(product);

//         // Se devuelve el producto creado.
//         return product;
//     }

//     // Actualiza parcialmente un producto existente.
//     // Partial<Product> permite modificar solo algunos atributos.
//     update(id: string, input: Partial<Product>): Product | undefined {

//         // Se combina el id recibido con los nuevos datos y
//         // se envía el objeto completo al repositorio.
//         return this.repo.update({ id, ...input } as Product);
//     }

//     // Elimina un producto según su id.
//     remove(id: string): { id: string } | undefined {

//         // Se delega la eliminación al repositorio.
//         return this.repo.delete({ id });
//     }
// }