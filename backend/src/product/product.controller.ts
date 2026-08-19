// To be updated


// import {Request,Response} from 'express';
// import { ProductRepository } from './product.repository.js';
// import { ProductService } from './product.service.js';

// // CONTROLLER => Su función principal es recibir las peticiones HTTP, 
// // comunicarse con el Service y devolver una respuesta al cliente.
// // Se crea una instancia del servicio, inyectándole el repositorio.
// // De esta manera el controlador podrá utilizar todas las operaciones CRUD.

// // Su responsabilidad es:
// //  *  Recibir la petición (Request).
// //  *  Obtener los datos necesarios (parámetros o body).
// //  *  Invocar el método correspondiente del Service.
// //  *  Devolver una respuesta HTTP (Response) con el resultado de la operación.
// const service = new ProductService(new ProductRepository());


// // =======================
// // GET /products
// // Obtiene todos los productos.
// // =======================
// export const findAll = (req: Request, res: Response) => {

//     // Se consulta al servicio por todos los productos
//     // y se envían en formato JSON.
//     res.json(service.findAll());
// }


// // =======================
// // GET /products/:id
// // Obtiene un producto por su id.
// // =======================
// export const findOne = (req: Request, res: Response) => {

//     // Se obtiene el id enviado como parámetro en la URL.
//     const id = req.params.id as string;

//     // Se busca el producto mediante el servicio.
//     const product = service.findOne(id);

//     // Si no existe, se responde con código HTTP 404.
//     if (!product) {
//         return res.status(404).send({
//             message: "Product not Found"
//         });
//     }

//     // Si existe, se devuelve en formato JSON.
//     return res.json(product);
// }


// // =======================
// // POST /products
// // Crea un nuevo producto.
// // =======================
// export const create = (req: Request, res: Response) => {

//     // Se crea el producto utilizando los datos sanitizados
//     // enviados en el cuerpo de la petición.
//     const product = service.create(req.body.sanitizedProductInput);

//     // Se responde con código 201 (Created),
//     // indicando que el recurso fue creado correctamente.
//     return res.status(201).send({
//         message: "Product created",
//         data: product
//     });
// }


// // =======================
// // PUT /products/:id
// // Actualiza un producto existente.
// // =======================
// export const update = (req: Request, res: Response) => {

//     // Se obtiene el id desde la URL.
//     const id = req.params.id as string;

//     // Se actualiza el producto con los nuevos datos.
//     const product = service.update(id, req.body.sanitizedProductInput);

//     // Si el producto no existe,
//     // se responde con código HTTP 404.
//     if (!product) {
//         return res.status(404).send({
//             message: "Product not Found"
//         });
//     }

//     // Si la actualización fue exitosa,
//     // se devuelve el producto actualizado.
//     return res.json({
//         message: "Product updated",
//         data: product
//     });
// }


// // =======================
// // DELETE /products/:id
// // Elimina un producto.
// // =======================
// export const remove = (req: Request, res: Response) => {

//     // Se obtiene el id desde la URL.
//     const id = req.params.id as string;

//     // Se solicita al servicio eliminar el producto.
//     const result = service.remove(id);

//     // Si el producto no existe,
//     // se responde con código HTTP 404.
//     if (!result) {
//         return res.status(404).send({
//             message: "Product not Found"
//         });
//     }

//     // Si la eliminación fue exitosa,
//     // se informa al cliente mediante un mensaje.
//     return res.json({
//         message: `Product with id ${result.id} successfully deleted`
//     });
// }