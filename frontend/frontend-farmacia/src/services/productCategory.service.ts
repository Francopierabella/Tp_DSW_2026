import type { ProductCategory } from "../types/productCategory";

// l frontend se relaciona con el backend exactamente en el momento en que ejecuta fetch() hacia una URL de tu API,
//  y el backend responde con datos en formato JSON.

const API_URL = "http://localhost:3000/api/productCategories";

export async function getProductCategories(): Promise<ProductCategory[]> {
  const response = await fetch(API_URL); 
  // basicamente Fetch es un metodo de JS que
  //  hace una peticion HTTP a la URL que le pasamos
  //  y devuelve una promesa con la respuesta.

  if (!response.ok) {
    throw new Error("Error al obtener las categorías");
  }

  return await response.json();
  /*
  esto es:
  cuando react llame a getProductCategories se ejecutará: 
  productCategory.service.ts -> GET http://localhost:3000/api/product-categories -> productCategory.controller.ts -> productCategory.service.ts -> productCategory.repository.ts -> orm.em.find(ProductCategory,{}) -> SELECT * FROM product_category
  -> express -> controller -> service -> repository -> orm -> base de datos. 
  y vuelve: 
  bd -> orm -> repo-> serv -> cont -> JSON -> fetch() -> react
  */
}

export async function createProductCategory(name:string) : Promise<ProductCategory>{
  const response = await fetch(API_URL,{
    method:'POST', // quiero hacer una peticion POST
    headers:{
      'Content-Type':'application/json'
       // le avisa a Express que los datos estan en formato JSON
    },
    body: JSON.stringify({name:name}), 
    //convierto el objeto {name:name} a JSON = {"name":name}
  });
  if(!response.ok){
    const error = await response.json();
    throw new Error(error.message);
  }
  const result = await response.json();
  return result.data;
  /*
  porque data, porque en el backend tenemos en el controllerr:
    return res.status(201).send({
    message: "ProductCategory created",
    data: productCategory
});
entonces  nuestro frontend recibe:
{
  "message": "ProductCategory created",
  "data": {
    "id": 4,
    "name": "Perfumería"
  }
} 
Luego lo que nos interesa a nosotors es "data", no message. por eso el .data
  */
}

export async function updateProductCategory( id: number, name: string): Promise<ProductCategory> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    throw new Error("Error updating the category");
  }

  const result = await response.json();

  return result.data;
}

export async function deleteProductCategory(id:number) : Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Error deleting the category");
  }
}