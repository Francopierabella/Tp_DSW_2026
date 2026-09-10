# Propuesta TP DSW

## Grupo

### Integrantes

- 53755 - Pierabella, Franco
- 54356 - Cristofoli, Fabricio Damian
- 53800 - Guarc, Joaquin Ismael
- 53831 - Melano, Iara

### Repositorios

- [frontend app](http://hyperlinkToGihubOrGitlab)
- [backend app](http://hyperlinkToGihubOrGitlab)

<br>

*Nota*: si utiliza un monorepo indicar un solo link con fullstack app.

## Tema

### Descripción

El sistema consiste en una aplicación web para la gestión y comercialización de productos de una farmacia.

La aplicación permitirá a los clientes consultar el catálogo de productos disponibles, visualizar información detallada, consultar categorías, agregar productos a un carrito y realizar compras mediante diferentes medios de pago.

Por otro lado, contará con funcionalidades destinadas a la administración de la farmacia, permitiendo gestionar productos, categorías, clientes, ventas y stock.

El sistema estará compuesto por un backend encargado de la lógica de negocio y persistencia de datos, y un frontend web destinado a la interacción con clientes y administradores.

### Tecnologías

El sistema será desarrollado utilizando:

- **Frontend:** React + TypeScript.
- **Backend:** Node.js + Express + TypeScript.
- **Base de datos:** MySQL.
- **ORM:** MikroORM.
- **Comunicación:** API REST.
- **Control de versiones:** Git.

### Modelo

![imagen del modelo](./MD-Farmacia-TpDSW.png)

---

## Alcance Funcional

### Alcance Mínimo

| Req | Detalle |
| :- | :- |
| CRUD simple | 1. CRUD CategoríaProducto |
| CRUD dependiente | 1. CRUD Producto {depende de} CRUD CategoríaProducto <br> 2. CRUD Venta {depende de} CRUD Cliente <br> 3. CRUD ItemVenta {depende de} CRUD Venta y Producto |
| Listado + detalle | 1. Listado de productos, con posibilidad de filtrado por categoría, mostrando nombre, precio y stock. El detalle muestra la información completa del producto. <br> 2. Listado de ventas filtradas por fecha o rango de fechas, mostrando fecha de venta, productos vendidos, cantidades, cliente y precio final. El detalle muestra la información completa de la venta. |
| Gestión de usuarios | 1. Registro e inicio de sesión de clientes. <br> 2. Gestión diferenciada entre clientes y administradores. |
| CUU/Epic | 1. Registrar una venta. <br> 2. Realizar una compra como cliente. <br> 3. Consultar disponibilidad de productos. |

### Adicionales para Aprobación

| Req | Detalle |
| :- | :- |
| CRUD | 1. CRUD Customer <br> 2. CRUD Product <br> 3. CRUD Sale <br> 4. CRUD SaleItem <br> 5. CRUD CategoryProduct <br> 6. CRUD Manager |
| Gestión de stock | 1. Consultar stock disponible. <br> 2. Actualizar stock luego de una venta. <br> 3. Controlar productos sin stock. <br> 4. Informar productos con stock bajo al administrador. |
| Carrito | 1. Agregar productos al carrito. <br> 2. Modificar cantidades. <br> 3. Eliminar productos. <br> 4. Calcular subtotales y total de compra. |
| Ventas | 1. Registrar los productos vendidos y sus cantidades. <br> 2. Asociar la venta con un cliente. <br> 3. Registrar el método de pago. <br> 4. Gestionar el estado de la venta. |
| Métodos de pago | La venta podrá utilizar alguno de los siguientes medios de pago: <br> - CASH <br> - TRANSFER <br> - CREDIT_CARD <br> - DEBIT_CARD |
| Estados de venta | Las ventas podrán encontrarse en alguno de los siguientes estados: <br> - PENDING <br> - CONFIRMED <br> - CANCELLED |
| Administración | 1. Panel de administración. <br> 2. Gestión de productos y categorías. <br> 3. Gestión de clientes y ventas. <br> 4. Control y actualización del stock. |
| Productos destacados | El administrador podrá determinar qué productos se muestran como "Productos destacados" en la página principal mediante una propiedad `isFeatured`. |
| CUU/Epic | 1. Realizar consulta siendo cliente a administrador. <br> 2. Informar faltantes de stock a administrador. <br> 3. Actualizar stock después de una venta realizada. <br> 4. Realizar una compra mediante el carrito. |

---

## Alcance Adicional Voluntario

*Nota*: El Alcance Adicional Voluntario es opcional, pero ayuda a que la funcionalidad del sistema esté completa y será considerado en la nota en función de su complejidad y esfuerzo.

| Req | Detalle |
| :- | :- |
| Listados | 1. Ventas realizadas por fecha. <br> 2. Productos con stock bajo. <br> 3. Productos más vendidos. <br> 4. Productos destacados. |
| Filtros y búsqueda | 1. Búsqueda de productos por nombre. <br> 2. Filtrado por categoría. <br> 3. Filtrado por disponibilidad de stock. |
