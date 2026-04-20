# Propuesta TP DSW

## Grupo
### Integrantes
* 53755 - Pierabella, Franco
* legajo - Cristofoli, Fabricio Damian
* legajo - Guarc, Joaquin Ismael
* legajo - Melano, Iara

### Repositorios
* [frontend app](http://hyperlinkToGihubOrGitlab)
* [backend app](http://hyperlinkToGihubOrGitlab)
*Nota*: si utiliza un monorepo indicar un solo link con fullstack app.

## Tema
### Descripción
El sistema consiste en una aplicación web para la gestión de una farmacia, que permitirá administrar productos, controlar el stock de medicamentos, registrar ventas a clientes y facilitarles la consulta de disponibilidad de productos.

### Modelo
![imagen del modelo]()

*Nota*: incluir un link con la imagen de un modelo, puede ser modelo de dominio, diagrama de clases, DER. Si lo prefieren pueden utilizar diagramas con [Mermaid](https://mermaid.js.org) en lugar de imágenes.

## Alcance Funcional 

### Alcance Mínimo

*Nota*: el siguiente es un ejemplo para un grupo de 3 integrantes para un sistema de hotel. El 

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Cliente <br>2. CRUD Producto<br>3. CRUD Proveedor|
|CRUD dependiente|1. CRUD Venta {depende de} CRUD Cliente<br>2. CRUD ItemVenta {depende de} CRUD Producto|
|Listado<br>+<br>detalle| 1. Listado de productos filtrado por categoria, muestra nombre,precio y Stock => detalle: Muestra informacion de producto <br> 2. Listado de ventas filtradas por fecha o rango de fechas, muestra fechaVenta, ProductoVendido y cantidad, nombre del cliente y precioFinal => detalle muestra datos completos de la venta realizada en tal fecha o rango de fechas|
|CUU/Epic|1. Registrar una venta <br>2. Iniciar sesion como Cliente|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Cliente <br>2. CRUD Producto <br>3. CRUD Proveedor<br>4. CRUD Venta <br>5. CRUD ItemVenta<br>6. CRUD Categoria <br>7. CRUD Farmaceutico|
|CUU/Epic|1. Registrar una venta<br>2. Iniciar sesion como Cliente <br>3. Actualizar Stock despues de venta realizada. |


### Alcance Adicional Voluntario

*Nota*: El Alcance Adicional Voluntario es opcional, pero ayuda a que la funcionalidad del sistema esté completa y será considerado en la nota en función de su complejidad y esfuerzo.

|Req|Detalle|
|:-|:-|
|Listados |1. Ventas realizadas por fecha <br>2.Productos con Stock bajo|
|CUU/Epic|1. Consumir servicios<br>2. Cancelación de reserva|
|Otros|1. Envío de recordatorio de reserva por email|

