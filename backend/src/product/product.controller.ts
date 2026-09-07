import { Request, Response } from 'express';
import { ProductRepository } from './product.repository.js';
import { ProductService } from './product.service.js';

// CONTROLLER => Su función principal es recibir las peticiones HTTP, 
// comunicarse con el Service y devolver una respuesta al cliente.
// Su responsabilidad es:
//  *  Recibir la petición (Request).
//  *  Obtener los datos necesarios (parámetros o body).
//  *  Invocar el método correspondiente del Service.
//  *  Devolver una respuesta HTTP (Response) con el resultado de la operación.

// Se crea una instancia del servicio, inyectándole el repositorio.
// De esta manera el controlador podrá utilizar todas las operaciones CRUD.

const service = new ProductService(new ProductRepository());

export async function findAll(req: Request, res: Response) {
    return res.json(await service.findAll());
}
export async function findOne(req: Request, res: Response) {
    const id = Number(req.params.id); // req.params.id is a string => Number.
    const product = await service.findOne(id);
    if (!product) {
        return res.status(404).send({ message: "Product not Found" });
    }
    return res.json(product);
}

export async function create(req: Request, res: Response) {
    try {
        const newProduct = await service.create(req.body.sanitizedProductInput);
        return res.status(201).send({ message: "Product created successfully", data: newProduct });
    }
    catch (error: any) {
        if (error.message === "A product with that name already exists.") {
            return res.status(409).send({ message: error.message });
        }
        return res.status(500).send({ message: "Internal server error" });
    }
}
export async function update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await service.update(id, req.body.sanitizedProductInput);
    if (!product) {
        return res.status(404).send({ message: "Product not Found" });
    }
    return res.json(product);
}
export async function remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    const product = await service.remove(id);
    if (!product) {
        return res.status(404).send({ message: "Product not Found" });
    }
    return res.json({ message: `Product, with id ${product.id} and name: ${product.name}, successfully deleted` });
}
