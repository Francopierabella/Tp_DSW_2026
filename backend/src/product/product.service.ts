
import { IRepository } from "../shared/base.repository.js";
import { Product } from "./product.entity.js";
// Importa la entidad Product y la interfaz IRepository.
// El servicio trabajará sobre cualquier repositorio que implemente IRepository.
export class ProductService {

    // El constructor recibe un repositorio de productos.
    // Gracias a la inyección de dependencias, el servicio no depende
    // de una implementación específica del repositorio.
    constructor(private readonly repo: IRepository<Product>) { }

    // Devuelve todos los productos almacenados.
    // Simplemente delega la búsqueda al repositorio.
    async findAll(): Promise<Product[] | undefined> {
        return await this.repo.findAll();
    }

    // Busca un producto por su id.
    // Recibe el id como parámetro y se lo pasa al repositorio.
    async findOne(id: number): Promise<Product | undefined> {
        return await this.repo.findOne({ id });
    }

    // Crea un nuevo producto.
    // Omit<Product, "id"> indica que el usuario NO debe enviar el id,
    // ya que éste se genera automáticamente en el constructor de Product.
    async create(input: Omit<Product, "id">): Promise<Product | undefined> {

        try {
            const newProduct = new Product(
                input.name,
                input.description,
                input.brand,
                input.gender,
                input.price,
                input.stock,
                input.categoryId
            );
            return await this.repo.add(newProduct);
        } catch (error: any) {
            if (error.code === "ER_DUP_ENTRY") {
                throw new Error("Ya existe un producto con ese nombre");
            }
            throw error;
        }
    }
    async update(id: number, input: Product): Promise<Product | undefined> {
        return await this.repo.update(id, input);
    }
    async remove(id: number): Promise<Product | undefined> {
        return await this.repo.delete({ id });
    }
}